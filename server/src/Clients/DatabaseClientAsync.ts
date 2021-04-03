import { Connection, EntityData, EntityManager, EntityName, FilterQuery, IDatabaseDriver } from "@mikro-orm/core";
import { injectable } from "inversify";
import { IDatabaseClientAsync } from "src/Abstractions/IDatabaseClientAsync";
import { IDatabaseEntity } from "src/Abstractions/IDatabaseEntity";

@injectable()
export class DatabaseClientAsync implements IDatabaseClientAsync
{
    db: EntityManager<IDatabaseDriver<Connection>>;

    constructor(db:EntityManager<IDatabaseDriver<Connection>>) 
    {
        this.db = db;
    }

    public async GetAllEntriesAsync<T extends IDatabaseEntity>(entity: EntityName<T>): Promise<T[]>
    {
        return await this.db.find(entity, {});
    }

    public async GetEntryAsync<T extends IDatabaseEntity>(entity: EntityName<T>, query: object): Promise<T>
    {
        return await this.db.findOneOrFail(entity, query as FilterQuery<T>);
    }

    public async UpdateEntryAsync<T extends IDatabaseEntity>(entry: T): Promise<T>
    {
        await this.db.persistAndFlush(entry);
        return entry;
    }

    public async PostEntryAsync<T extends IDatabaseEntity>(entity: EntityName<T>, DataToUpdate: object): Promise<T>
    {
        const entry = this.db.create(entity, DataToUpdate as EntityData<T>);
        await this.db.persistAndFlush(entry);
        return entry;
    }

    public async DeleteEntryAsync<T extends IDatabaseEntity>(entity: EntityName<T>, query: object): Promise<void>
    {
        await this.db.nativeDelete(entity, query as FilterQuery<T>);
    }
}
