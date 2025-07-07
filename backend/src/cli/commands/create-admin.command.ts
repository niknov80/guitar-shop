import { Command } from '../command.interface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { UserModel } from '../../models/user.model';

const ADMIN_EMAIL = 'admin@guitar-shop.local';
const ADMIN_PASSWORD = 'admin';

export class CreateAdminCommand implements Command {
  public readonly name = '--create-admin';

  public async execute(...parameters: string[]): Promise<void> {
    config();
    const [connectionUriArg] = parameters;
    const connectionUri = connectionUriArg || process.env.MONGO_URI;

    if (!connectionUri) {
      console.error('Не указана строка подключения (ни аргументом, ни через MONGO_URI).');
      return;
    }

    try {
      await mongoose.connect(connectionUri);
      const exists = await UserModel.findOne({ email: ADMIN_EMAIL });

      if (exists) {
        console.warn('Пользователь admin уже существует');
      } else {
        const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
        await UserModel.create({
          name: 'Admin',
          email: ADMIN_EMAIL,
          password: passwordHash,
        });
        console.info('Пользователь admin успешно создан');
      }

      await mongoose.disconnect();
    } catch (err) {
      console.error(`Ошибка: ${(err as Error).message}`);
    }
  }
}
