import { Connection, EntityManager, EntityName, IDatabaseDriver } from "@mikro-orm/core";
import { IDatabaseEntity } from "./IDatabaseEntity";

export interface IDatabaseClientAsync
{
    db: EntityManager<IDatabaseDriver<Connection>>;

    GetAllEntriesAsync<T extends IDatabaseEntity>(Entity: EntityName<T>): Promise<T[]>;

    GetEntryAsync<T extends IDatabaseEntity>(Entity: EntityName<T>, query: object): Promise<T>;

    UpdateEntryAsync<T extends IDatabaseEntity>(entry: T): Promise<T>;

    PostEntryAsync<T extends IDatabaseEntity>(Entity: EntityName<T>, DataToUpdate: object): Promise<T>;

    DeleteEntryAsync<T extends IDatabaseEntity>(Entity: EntityName<T>, query: object): Promise<void>;
}