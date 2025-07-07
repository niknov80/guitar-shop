import { Command } from '../command.interface';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { ProductModel } from '../../models/product.model';
import { CreateProductDto } from '../../schemas/product.schema';
import { faker } from '@faker-js/faker';
import path, { isAbsolute, join, basename } from 'path';
import { readFileSync, existsSync } from 'fs';
import { parse } from 'csv-parse/sync';

const IMAGE_COUNT = 9;
const IMAGE_PREFIX = 'catalog-product-';
const IMAGE_DIR = 'static/img';

export class GenerateCommand implements Command {
  public readonly name = '--generate';

  public async execute(...parameters: string[]): Promise<void> {
    config();

    let count = 0;
    let connectionUri: string | undefined = undefined;
    let delimiter: ',' | '\t' | null = null;
    let filePath: string | undefined = undefined;

    for (let i = 0; i < parameters.length; i++) {
      const param = parameters[i];

      if (param === '--from-csv') {
        delimiter = ',';
        filePath = parameters[i + 1];
        i++;
      } else if (param === '--from-file') {
        delimiter = '\t';
        filePath = parameters[i + 1];
        i++;
      } else if (/^\d+$/.test(param)) {
        count = Number(param);
      } else if (param.startsWith('mongodb://') || param.startsWith('mongodb+srv://')) {
        connectionUri = param;
      }
    }

    connectionUri = connectionUri || process.env.MONGO_URI;

    if (!count || isNaN(count)) {
      console.error('❌ Укажите корректное количество записей.');
      return;
    }

    if (!connectionUri) {
      console.error('❌ Строка подключения не указана и не найдена в .env (MONGO_URI).');
      return;
    }

    try {
      await mongoose.connect(connectionUri);
      console.log('Подключение к базе установлено');

      if (delimiter && filePath) {
        if (!existsSync(filePath)) {
          console.error(`Файл не найден: ${filePath}`);
          return;
        }
        await this.importFromDelimitedFile(filePath, delimiter);
      } else {
        await this.generateFakeProducts(count);
      }

      console.log('Генерация завершена');
      await mongoose.disconnect();
    } catch (err) {
      console.error(`❌ Ошибка: ${(err as Error).message}`);
    }
  }

  private getRandomImage(): string {
    const index = Math.floor(Math.random() * IMAGE_COUNT);
    return path.join(IMAGE_DIR, `${IMAGE_PREFIX}${index}.png`);
  }

  private async generateFakeProducts(count: number) {
    const types = ['электро', 'аккустика', 'укулеле'] as const;
    const stringCounts = [4, 6, 7, 12] as const;

    const products: CreateProductDto[] = Array.from({ length: count }, () => ({
      name: faker.commerce.productName().slice(0, 100),
      description: faker.lorem.paragraph().slice(0, 1024),
      type: faker.helpers.arrayElement(types),
      article: faker.string.alphanumeric(10),
      stringCount: faker.helpers.arrayElement(stringCounts),
      price: Number(faker.commerce.price({ min: 100, max: 1000000 })),
      image: this.getRandomImage(),
    }));

    await ProductModel.insertMany(products);
    console.log(`Сгенерировано ${count} товаров`);
  }

  private async importFromDelimitedFile(filePath: string, delimiter: ',' | '\t') {
    const resolvedPath =
      isAbsolute(filePath) || filePath.startsWith('./') || filePath.startsWith('../')
        ? filePath
        : join(process.cwd(), 'test-data', filePath);

    if (!existsSync(resolvedPath)) {
      console.error(`❌ Файл не найден: ${resolvedPath}`);
      return;
    }

    const content = readFileSync(resolvedPath, 'utf-8');
    const records = parse(content, {
      delimiter,
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const products: CreateProductDto[] = records.map((r: Record<string, string>) => ({
      name: r.name,
      description: r.description,
      type: r.type,
      article: r.article,
      stringCount: Number(r.stringCount) as 4 | 6 | 7 | 12,
      price: Number(r.price),
      image: this.getRandomImage(),
    }));

    await ProductModel.insertMany(products);
    console.log(
      `Импортировано ${products.length} товаров из ${basename(resolvedPath)} (разделитель: "${delimiter}")`
    );
  }
}
