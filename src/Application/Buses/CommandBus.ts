import {
    IApplication,
    ICommand,
    ICommandBus,
    ICommandHandler,
} from "contracts.ts";
export class CommandBus implements ICommandBus {
    constructor(private readonly app: IApplication) {
    }
    async dispatch<T extends ICommand>(command: T): Promise<void> {
        const handler = this.app.get<ICommandHandler<T>>(
            command.constructor.name,
        );
        if (!handler) {
            throw new Error(
                `No handler found for command: ${command.constructor.name}`,
            );
        }
        await handler.execute(command);
    }
}
