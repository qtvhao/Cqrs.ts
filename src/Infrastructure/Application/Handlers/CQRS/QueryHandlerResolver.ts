import { IQuery, IQueryHandler, IQueryHandlerResolver, QueryConstructor } from "contracts.ts";
import { IQueryResult } from "contracts.ts/dist/Application/DTOs/IQueryResult";

export class QueryHandlerResolver implements IQueryHandlerResolver {
  private readonly handlers = new Map<string, IQueryHandler<IQuery, IQueryResult>>();

  register<T extends IQuery, TResult extends IQueryResult>(
    query: QueryConstructor<T>,
    handler: IQueryHandler<T, TResult>
  ): void {
    const key = query.name;
    if (this.handlers.has(key)) {
      throw new Error(`Query handler already registered for ${key}`);
    }
    this.handlers.set(key, handler as IQueryHandler<IQuery, IQueryResult>);
  }

  resolve<T extends IQuery, TResult extends IQueryResult>(
    query: QueryConstructor<T>
  ): IQueryHandler<T, TResult> {
    const handler = this.handlers.get(query.name);
    if (!handler) {
      throw new Error(`No handler registered for query: ${query.name}`);
    }
    return handler as IQueryHandler<T, TResult>;
  }
}
