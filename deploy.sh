#!/bin/bash
set -e

echo "🚀 Deploying minprice.kz..."
cd /var/www/minprice_web

git pull origin main
npm install
npm run build
pm2 restart minprice-web

echo "✅ Done! https://minprice.kz"
