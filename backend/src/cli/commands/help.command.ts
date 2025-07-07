import { Command } from '../command.interface';

export class HelpCommand implements Command {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
  Доступные команды:

  --generate <n> [connectionString] [--from-file <path>] [--from-csv <path>]
      Генерирует <n> товаров. Данные можно сгенерировать случайно или импортировать из файла.
      connectionString можно не указывать, если задана переменная .env (MONGO_URI)

      Примеры:
        gshop --generate 10
        gshop --generate 50 mongodb://localhost:27018/guitar-shop --from-file guitars.csv
        gshop --generate 20 --from-csv guitars.csv

  --create-admin [connectionString]
      Создаёт пользователя admin с паролем admin.
      Можно указать строку подключения или использовать переменную окружения MONGO_URI.

      Пример:
        gshop --create-admin

  --delete-products [connectionString]
      Удаляет все товары из базы.

      Пример:
        gshop --delete-products

  --help
      Показывает этот список команд.

  Все команды поддерживают автоматическое использование переменной .env:MONGO_URI, если не указана строка подключения.
    `);
  }
}
