export interface Command {
  readonly name: string;
  execute(...args: string[]): void | Promise<void>;
}
