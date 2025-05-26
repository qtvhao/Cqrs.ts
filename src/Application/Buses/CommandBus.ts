import { ICommand, ICommandBus, ICommandHandlerResolver } from "contracts.ts";

export class CommandBus implements ICommandBus {
    constructor(
        readonly handlerResolver: ICommandHandlerResolver
    ) {}

    async dispatch<T extends ICommand>(command: T): Promise<void> {
        const handler = this.handlerResolver.resolve<T, void>(command);
        if (!handler) {
            throw new Error(`No handler found for command: ${command.constructor.name}`);
        }

        await handler.handle(command);
    }
}
