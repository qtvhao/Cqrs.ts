import { ICommand, ICommandBus, ICommandHandler } from "contracts.ts";

export type CommandConstructor<T extends ICommand = ICommand> = new (...args: any[]) => T;

export class CommandBus implements ICommandBus {
    private handlers = new Map<Function, ICommandHandler<ICommand>>();

    register<T extends ICommand>(
        commandClass: CommandConstructor<T>,
        handler: ICommandHandler<T>,
    ): void {
        if (this.handlers.has(commandClass)) {
            throw new Error(`Handler already registered for command: ${commandClass.name}`);
        }
        this.handlers.set(commandClass, handler as ICommandHandler<ICommand>);
    }

    async dispatch<T extends ICommand>(command: T): Promise<void> {
        const commandClass = command.constructor as CommandConstructor<T>;
        const handler = this.handlers.get(commandClass) as ICommandHandler<T> | undefined;

        if (!handler) {
            throw new Error(`No handler registered for command: ${commandClass.name}`);
        }

        await handler.execute(command);
    }
}
