import { Entity, Property } from "@mikro-orm/core";
import { injectable } from "inversify";
import { DatabaseEntity } from "./DatabaseEntity";

@injectable()
@Entity()
export class Post extends DatabaseEntity 
{
    @Property({type: 'text'})
    title!: string;
}