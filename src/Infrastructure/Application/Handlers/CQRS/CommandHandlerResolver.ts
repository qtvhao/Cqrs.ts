import {
    ICommand,
    ICommandHandler,
    ICommandHandlerResolver,
    QueryConstructor,
} from "contracts.ts";

export class CommandHandlerResolver implements ICommandHandlerResolver {
    private readonly handlers = new Map<string, ICommandHandler<ICommand>>();

    register<T extends ICommand>(
        query: QueryConstructor<T>,
        handler: ICommandHandler<T>,
    ): void {
        const key = query.name;
        if (this.handlers.has(key)) {
            throw new Error(`Command handler already registered for ${key}`);
        }
        this.handlers.set(key, handler as ICommandHandler<ICommand>);
    }

    resolve<T extends ICommand>(
        query: QueryConstructor<T>,
    ): ICommandHandler<T> {
        const handler = this.handlers.get(query.name);
        if (!handler) {
            throw new Error(`No handler registered for query: ${query.name}`);
        }
        return handler as ICommandHandler<T>;
    }
}
