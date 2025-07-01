# Guitar Shop — Backend

## 📦 Установка

```bash
npm ci
```

## ⚙️ Настройка переменных окружения

Создайте `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

Пример `.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/guitar-shop
JWT_SECRET=your_jwt_secret_here
```

## 🚀 Запуск

### В режиме разработки (с перезапуском при изменениях):

```bash
npm run dev
```

### Сборка проекта:

```bash
npm run build
```

### Запуск собранной версии:

```bash
npm start
```

## 🔬 Проверки

### ESLint (линтинг):

```bash
npm run lint
```

### Prettier (форматирование):

```bash
npm run format      # авто-форматирование
npm run format:check # только проверка
```

## 🛠 CLI (заполнение базы)

```bash
npm run cli -- --generate <n> <connection-string>
```

Пример:

```bash
npm run cli -- --generate 10 mongodb://localhost:27017/guitar-shop
```

## 📁 Структура

```bash
backend/
├── src/
│   ├── app.ts                 # Express-приложение
│   ├── index.ts               # Точка входа
│   └── config/
│       └── mongodb.ts         # Подключение к MongoDB
├── .env.example
├── eslint.config.js
├── .prettierrc.json
├── package.json
└── tsconfig.json
```

## 📘 Спецификация API

Находится в `specification/openapi.yaml` (формат OpenAPI YAML).

## 🐳 Docker (опционально)

```bash
docker-compose up --build
```

## 🧪 Здоровье сервера

Проверка доступности:

```
GET /health → 200 OK { status: "ok" }
```
