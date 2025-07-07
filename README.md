# Guitar Shop (Fullstack Monorepo)

# Структура проекта

```
guitar-shop/
├── backend/                # Backend (Node.js + Express + MongoDB)
├── frontend/               # Frontend (React + Vite + TypeScript)
├── specification/          # OpenAPI YAML спецификация
├── docker-compose.yml      # Docker конфигурация
└── README.md               # ← текущий файл
```

---

# Установка и запуск проекта

## Установка зависимостей 

```bash
npm ci --prefix backend
```
```bash
npm ci --prefix frontend
```

## Переменные окружения:
Скопировать и задать 
```bash
cp backend/.env.example backend/.env
```

## Установка и запуск MongoDB и Mongo-Express в Docker

```bash
docker-compose -f backend/docker-compose.yml up -d
```

## Запуск backend

```bash
npm run dev --prefix backend
```

## Запуск frontend
```bash
npm run start --prefix frontend
```

# Сценарии

## Backend

Запускает сервер в режиме разработки с автоматическим перезапуском при изменениях. Использует ts-node-dev.
```
npm run dev
```
Компилирует TypeScript-код в директорию dist/ с помощью tsc.
```
npm run build
```
Запускает уже собранный (скомпилированный) проект из dist/index.js.
```
npm run start
```
Запускает CLI-интерфейс (src/cli/index.ts) для генерации данных, импорта, удаления и т.д. После -- передаются аргументы CLI.
```
npm run cli --
```
Запускает ESLint для проверки стиля и потенциальных ошибок в .ts-файлах.
```
npm run lint
```
Форматирует весь проект с помощью Prettier.
```
npm run format
```
Проверяет, соответствует ли код правилам форматирования без изменения файлов.
```
npm run format:check
```

## Frontend
Запускает dev-сервер Vite (vite). Используется для локальной разработки.
```
npm run start
```
Компилирует TypeScript и собирает production-версию фронтенда с помощью vite build.
```
npm run build
```
Запускает сервер для предварительного просмотра production-сборки.
```
npm run preview
```
Проверяет только исходники в src/ на соответствие правилам ESLint.
```
npm run lint
```
Запускает тесты с помощью vitest. Поддерживает запуск без тестов (--passWithNoTests).
```
npm run test
```

# CLI-интерфейс (выполняется из backend/)

## Собрать проект
```bush
npm run build
```

## Зарегистрировать CLI как глобальный бинарник
```bash
npm unlink -g
npm link
```

## Команда `--generate`
Генерирует тестовые товары в базу данных.

```bash
gshop --generate <n> [connectionString] [--from-file <tsv>] [--from-csv <csv>]
```
n — количество товаров
connectionString можно не указывать, если задана .env:MONGO_URI
файлы берутся из backend/test-data/, если путь не абсолютный

Примеры:
```
gshop --generate 10
gshop --generate 100 --from-csv guitars.csv
gshop --generate 50 mongodb://localhost:27018/guitar-shop --from-file guitars.csv
```

## Команда `--create-admin`
Создаёт пользователя admin@guitar-shop.local с паролем admin:

```bash
gshop --create-admin
```

## Команда `--delete-products`
Удаляет все товары из базы данных:

```bash
gshop --delete-products
```

## Команда `--help`
Показывает список доступных CLI-команд:

```bash
gshop --help
```
