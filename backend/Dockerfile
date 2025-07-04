# 1. Базовый образ
FROM node:20

# 2. Рабочая директория внутри контейнера
WORKDIR /app

# 3. Копируем package.json и lock
COPY backend/package*.json ./

# 4. Устанавливаем зависимости
RUN npm install

# 5. Копируем исходники
COPY backend ./
COPY shared ./shared

# 6. Сборка TypeScript
RUN npm run build

# 7. Продрежим
ENV NODE_ENV=production

# 8. Открываем порт
EXPOSE 3000

# 9. Запуск
CMD ["node", "dist/index.js"]
