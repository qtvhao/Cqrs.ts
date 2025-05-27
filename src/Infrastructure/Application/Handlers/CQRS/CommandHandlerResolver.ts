import {
    CommandConstructor,
    ICommand,
    ICommandHandler,
    ICommandHandlerResolver,
} from "contracts.ts";
import { injectable } from "inversify";

@injectable()
export class CommandHandlerResolver implements ICommandHandlerResolver {
    private readonly handlers = new Map<string, ICommandHandler<ICommand>>();

    register<T extends ICommand>(
        command: CommandConstructor<T>,
        handler: ICommandHandler<T>,
    ): void {
        const key = command.name;
        if (this.handlers.has(key)) {
            throw new Error(`Command handler already registered for ${key}`);
        }
        this.handlers.set(key, handler as ICommandHandler<ICommand>);
    }

    resolve<T extends ICommand>(
        command: CommandConstructor<T>,
    ): ICommandHandler<T> {
        const handler = this.handlers.get(command.name);
        if (!handler) {
            throw new Error(
                `No handler registered for command: ${command.name}`,
            );
        }
        return handler as ICommandHandler<T>;
    }
}
