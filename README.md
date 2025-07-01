# Guitar Shop (Fullstack Monorepo)

## 📁 Структура проекта

```
guitar-shop/
├── backend/                # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   └── README.md
├── frontend/               # Frontend (React + Vite + TypeScript)
│   ├── src/
│   └── README.md (опционально)
├── specification/          # OpenAPI YAML спецификация
│   └── openapi.yaml
├── docker-compose.yml      # Docker конфигурация
├── .gitignore
└── README.md               # ← текущий файл
```

---

## 🚀 Быстрый старт (dev)

### Установка зависимостей

```bash
cd backend
npm ci
```

### Запуск backend в dev-режиме

```bash
npm run dev
```

### Подготовка frontend (после scaffold)

```bash
cd frontend
npm ci
npm run dev
```

---

## 🐳 Docker (опционально)

```bash
docker-compose up --build
```

> Сервисы:
>
> * `mongo` — база данных
> * `backend` — API сервер

