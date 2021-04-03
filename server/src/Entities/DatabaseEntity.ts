import { PrimaryKey, Property } from "@mikro-orm/core";
import { IDatabaseEntity } from "src/Abstractions/IDatabaseEntity";

export abstract class DatabaseEntity implements IDatabaseEntity
{
    @PrimaryKey()
    readonly id!: number;

    @Property({ type: 'date' })
    readonly createdAt = new Date();

    @Property({ type: 'date', onUpdate: () => new Date() })
    readonly updatedAt = new Date();
}