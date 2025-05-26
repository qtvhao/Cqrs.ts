import { IQuery, IQueryBus, IQueryHandlerResolver } from "contracts.ts";
import { IQueryResult } from "contracts.ts/dist/Application/DTOs/IQueryResult";

export type QueryConstructor<T extends IQuery = IQuery> = new (...args: any[]) => T;

export class QueryBus implements IQueryBus {
  constructor(private readonly resolver: IQueryHandlerResolver) {}

  async execute<T extends IQuery, R extends IQueryResult>(query: T): Promise<R | void> {
    const handler = this.resolver.resolve<T, R>(query.constructor as QueryConstructor<T>);
    return await handler.execute(query);
  }
}
