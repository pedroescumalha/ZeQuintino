import { Connection, EntityManager, EntityName, IDatabaseDriver } from "@mikro-orm/core";
import { IDatabaseEntity } from "./IDatabaseEntity";

export interface IDatabaseClientAsync<T extends IDatabaseEntity>
{
    entity: EntityName<T>;

    db: EntityManager<IDatabaseDriver<Connection>>;

    GetAllEntriesAsync(): Promise<T[]>;

    GetEntryAsync(query: object): Promise<T>;

    UpdateEntryAsync(entry: T): Promise<T>;

    PostEntryAsync(DataToUpdate: object): Promise<T>;

    DeleteEntryAsync(query: object): Promise<void>;
}