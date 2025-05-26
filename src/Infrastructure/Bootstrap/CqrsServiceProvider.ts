import { ICommandBus, IEventHandlerResolver, IQueryBus, IQueryHandlerResolver, IServiceProvider, TYPES } from "contracts.ts";
import { ServiceProvider } from "support.ts";
import { CommandBus } from "../../Application/Buses/CommandBus";
import { QueryBus } from "../../Application/Buses/QueryBus";
import { QueryHandlerResolver } from "../Application/Handlers/CQRS/QueryHandlerResolver";

export class CqrsServiceProvider extends ServiceProvider
    implements IServiceProvider {
    register(): void {
        this.app.bind<ICommandBus>(TYPES.CommandBus).to(CommandBus)
            .inSingletonScope();
        this.app.bind<IQueryBus>(TYPES.QueryBus).to(QueryBus)
            .inSingletonScope();
        this.app.bind<IQueryHandlerResolver>(TYPES.QueryHandlerResolver).to(QueryHandlerResolver)
            .inSingletonScope();
    }
}
