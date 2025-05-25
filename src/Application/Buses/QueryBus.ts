import { IQuery, IQueryBus, IQueryHandler } from "contracts.ts";

export type QueryConstructor<T extends IQuery = IQuery> = new (...args: any[]) => T;

export class QueryBus implements IQueryBus {
    private handlers = new Map<QueryConstructor, IQueryHandler<IQuery, unknown>>();

    register<TQuery extends IQuery, TResult>(
        queryType: QueryConstructor<TQuery>,
        handler: IQueryHandler<TQuery, TResult>,
    ): void {
        if (this.handlers.has(queryType)) {
            throw new Error(`Query handler for ${queryType.name} is already registered.`);
        }
        this.handlers.set(queryType, handler as IQueryHandler<IQuery, unknown>);
    }

    async execute<TQuery extends IQuery, TResult>(
        query: TQuery,
    ): Promise<TResult> {
        const queryType = query.constructor as QueryConstructor<TQuery>;
        const handler = this.handlers.get(queryType) as IQueryHandler<TQuery, TResult>;

        if (!handler) {
            throw new Error(`No query handler registered for ${queryType.name}`);
        }

        return await handler.execute(query);
    }
}
