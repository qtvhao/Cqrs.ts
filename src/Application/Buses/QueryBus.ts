import { IQuery, IQueryBus, IQueryHandler, IQueryHandlerResolver } from "contracts.ts";

export type QueryConstructor<T extends IQuery = IQuery> = new (...args: any[]) => T;

export class QueryBus implements IQueryBus {
    constructor(private resolver: IQueryHandlerResolver) { }

    async execute<T extends IQuery, R>(query: T): Promise<R> {
        return {
            results: {},
            query,
        } as R;
    }
}
