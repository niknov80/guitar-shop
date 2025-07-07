import { Command } from './command.interface';
import { GenerateCommand } from './commands/generate.command';
import { CreateAdminCommand } from './commands/create-admin.command';
import { DeleteProductsCommand } from './commands/delete-products.command';
import { HelpCommand } from './commands/help.command';

export class CLIApplication {
  private commands: Command[] = [];

  constructor() {
    this.commands = [
      new GenerateCommand(),
      new CreateAdminCommand(),
      new DeleteProductsCommand(),
      new HelpCommand(),
    ];
  }

  public async run(args: string[]): Promise<void> {
    const [commandName, ...commandArgs] = args;

    if (!commandName) {
      const helpCommand = this.commands.find(cmd => cmd.name === '--help');
      await helpCommand?.execute();
      return;
    }

    const command = this.commands.find(cmd => cmd.name === commandName);

    if (!command) {
      console.log(`Неизвестная команда: ${commandName}`);
      const helpCommand = this.commands.find(cmd => cmd.name === '--help');
      await helpCommand?.execute();
      return;
    }

    await command.execute(...commandArgs);
  }
}
