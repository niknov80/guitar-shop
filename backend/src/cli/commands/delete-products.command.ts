import { Command } from '../command.interface';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { ProductModel } from '../../models/product.model';

export class DeleteProductsCommand implements Command {
  public readonly name = '--delete-products';

  public async execute(...parameters: string[]): Promise<void> {
    config();
    const [connectionUriArg] = parameters;
    const connectionUri = connectionUriArg || process.env.MONGO_URI;

    if (!connectionUri) {
      console.error('Укажите строку подключения или задайте MONGO_URI в .env');
      return;
    }

    try {
      await mongoose.connect(connectionUri);
      const result = await ProductModel.deleteMany({});
      console.info(`🗑Удалено товаров: ${result.deletedCount}`);
      await mongoose.disconnect();
    } catch (err) {
      console.error(`Ошибка удаления: ${(err as Error).message}`);
    }
  }
}
