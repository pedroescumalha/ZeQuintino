import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { IDatabaseEntity } from "src/Abstractions/IDatabaseEntity";

export abstract class DatabaseEntity implements IDatabaseEntity
{
    @PrimaryKey()
    id!: number;

    @Property({ type: 'date' })
    createdAt = new Date();

    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();
}