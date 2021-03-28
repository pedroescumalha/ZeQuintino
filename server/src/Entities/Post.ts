import { Entity, Property } from "@mikro-orm/core";
import { DatabaseEntity } from "./DatabaseEntity";

@Entity()
export class Post extends DatabaseEntity 
{
    @Property({type: 'text'})
    title!: string;
}