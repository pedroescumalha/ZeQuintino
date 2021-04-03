import { Entity, Property } from "@mikro-orm/core";
import { injectable } from "inversify";
import { DatabaseEntity } from "./DatabaseEntity";

@injectable()
@Entity()
export class User extends DatabaseEntity 
{
    @Property({ type: "text", unique: true })
    username!: string;

    @Property({ type: "text" })
    password!: string;
}