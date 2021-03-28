import { Connection, EntityData, EntityManager, EntityName, FilterQuery, IDatabaseDriver } from "@mikro-orm/core";
import { IDatabaseClientAsync } from "src/Abstractions/IDatabaseClientAsync";
import { IDatabaseEntity } from "src/Abstractions/IDatabaseEntity";

export class DatabaseClientAsync<T extends IDatabaseEntity> implements IDatabaseClientAsync<T>
{
    entity: EntityName<T>;
    db: EntityManager<IDatabaseDriver<Connection>>;

    constructor(entity: EntityName<T>, db:EntityManager<IDatabaseDriver<Connection>>) 
    {
        this.entity = entity;
        this.db = db;
    }

    public async GetAllEntriesAsync(): Promise<T[]>
    {
        return await this.db.find(this.entity, {});
    }

    public async GetEntryAsync(query: object): Promise<T>
    {
        return await this.db.findOneOrFail(this.entity, query as FilterQuery<T>);
    }

    public async UpdateEntryAsync(entry: T): Promise<T>
    {
        await this.db.persistAndFlush(entry);
        return entry;
    }

    public async PostEntryAsync(DataToUpdate: object): Promise<T>
    {
        const entry = this.db.create(this.entity, DataToUpdate as EntityData<T>);
        await this.db.persistAndFlush(entry);
        return entry;
    }

    public async DeleteEntryAsync(query: object): Promise<void>
    {
        await this.db.nativeDelete(this.entity, query as FilterQuery<T>);
    }
}
