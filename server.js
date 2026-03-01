/**
 * minprice.kz — SSR Meta Proxy
 *
 * Для людей → отдаёт dist/index.html (обычный SPA)
 * Для ботов (TG, WA, FB, VK, crawler) → подтягивает данные с API
 *   и отдаёт HTML с уже подставленными OG/Twitter мета-тегами
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const API_BASE = "https://backend.minprice.kz/api";
const SITE_URL = "https://minprice.kz";
const DIST_DIR = path.join(__dirname, "dist");

// Читаем index.html один раз при старте
const indexHtml = readFileSync(path.join(DIST_DIR, "index.html"), "utf-8");

// Паттерны User-Agent мессенджеров и поисковых ботов
const BOT_RE =
    /telegrambot|whatsapp|facebookexternalhit|vkshare|twitterbot|linkedinbot|slackbot|discordbot|applebot|yandexbot|googlebot|bingbot|pinterest|viber/i;

const isBot = (ua) => BOT_RE.test(ua || "");

// ─── Утилита: вставить мета-теги в index.html ─────────────────────────────
function injectMeta(html, { title, description, image, url }) {
    const escaped = (s) =>
        String(s ?? "")
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    const t = escaped(title);
    const d = escaped(description);
    const img = escaped(image);
    const u = escaped(url);

    const meta = `
    <title>${t}</title>
    <meta name="description" content="${d}" />
    <meta property="og:site_name" content="minprice.kz" />
    <meta property="og:type" content="product" />
    <meta property="og:url" content="${u}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:image" content="${img}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="ru_KZ" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${img}" />`;

    // Заменяем <title>...</title> и вставляем мета сразу после <head>
    return html
        .replace(/<title>.*?<\/title>/s, "")
        .replace("<head>", `<head>${meta}`);
}

// ─── Статика (JS, CSS, assets) ────────────────────────────────────────────
app.use(
    express.static(DIST_DIR, {
        // index.html обрабатываем сами ниже
        index: false,
        // Долгое кэширование для хэшированных файлов
        maxAge: "1y",
        immutable: true,
        setHeaders(res, filePath) {
            // index.html не кэшируем
            if (filePath.endsWith("index.html")) {
                res.setHeader("Cache-Control", "no-cache");
            }
        },
    })
);

// ─── Страница продукта (/product/:uuid) ───────────────────────────────────
app.get("/product/:uuid", async (req, res) => {
    const { uuid } = req.params;
    const ua = req.headers["user-agent"];

    if (!isBot(ua)) {
        // Обычный пользователь — отдаём SPA
        return res.send(indexHtml);
    }

    try {
        const response = await fetch(`${API_BASE}/products/${uuid}/`, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) throw new Error(`API ${response.status}`);

        const product = await response.json();

        const name = product.title || "Товар";
        const qty = product.measure_unit_qty ?? "";
        const unit = product.measure_unit_kind || product.measure_unit || "";
        const weight = qty ? `${qty}${unit}` : unit;

        // Минимальная цена
        const stores =
            product.price_range?.stores || product.stores || [];
        const prices = stores.map((s) => s.price).filter(Boolean);
        const minPrice = prices.length ? Math.min(...prices) : null;

        const title = `${name}${weight ? ` ${weight}` : ""} — minprice.kz`;
        const description = minPrice
            ? `${name} — от ${minPrice} ₸. Сравните цены в магазинах Казахстана.`
            : `${name} — сравнение цен в Казахстане на minprice.kz`;
        const image = product.image_url || `${SITE_URL}/og-image.png`;
        const url = `${SITE_URL}/product/${uuid}`;

        const html = injectMeta(indexHtml, { title, description, image, url });
        res.setHeader("Cache-Control", "public, max-age=300"); // кэш 5 мин для ботов
        res.send(html);
    } catch (err) {
        console.error("Meta proxy error:", err.message);
        // Fallback — отдаём обычный index.html
        res.send(indexHtml);
    }
});

// ─── Все остальные роуты SPA → index.html ─────────────────────────────────
app.get("*", (_req, res) => {
    res.send(indexHtml);
});

app.listen(PORT, () => {
    console.log(`minprice.kz server running on http://localhost:${PORT}`);
});
