import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { IsProdEnvironment } from "./constants";
import { Post } from "./Entities/Post";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/, 
    },
    entities: [Post],
    dbName: 'zequintino',
    user: 'postgres',
    password: 'gotchasnotgoofy21',
    type: 'postgresql',
    debug: !IsProdEnvironment,
} as Parameters<typeof MikroORM.init>[0];