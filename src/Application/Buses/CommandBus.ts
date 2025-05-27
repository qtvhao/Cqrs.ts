import { CommandConstructor, ICommand, ICommandBus, ICommandHandlerResolver, TYPES } from "contracts.ts";
import { injectable, inject } from "inversify";

@injectable()
export class CommandBus implements ICommandBus {
    constructor(
        @inject(TYPES.CommandHandlerResolver)
        readonly handlerResolver: ICommandHandlerResolver
    ) {}

    async dispatch<T extends ICommand>(command: T): Promise<void> {
        const handler = this.handlerResolver.resolve<T>(command.constructor as CommandConstructor<T>);
        if (!handler) {
            throw new Error(`No handler found for command: ${command.constructor.name}`);
        }

        await handler.handle(command);
    }
}
