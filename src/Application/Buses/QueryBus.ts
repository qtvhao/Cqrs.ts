import { IApplication, IQuery, IQueryBus, IQueryHandler } from "contracts.ts";

export class QueryBus implements IQueryBus {
    constructor(private app: IApplication) {}
    async execute<TQuery extends IQuery, TResult>(
        query: TQuery,
    ): Promise<TResult> {
        const handler = this.app.get<IQueryHandler<TQuery, TResult>>(
            query.constructor.name,
        );
        if (!handler) {
            throw new Error(
                `No handler found for query: ${query.constructor.name}`,
            );
        }
        return handler.execute(query);
    }
}
