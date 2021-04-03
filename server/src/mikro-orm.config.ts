import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { IsProdEnvironment } from "./Constants/constants";
import { Post } from "./Entities/Post";
import { User } from "./Entities/User";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/, 
    },
    entities: [Post, User],
    dbName: 'zequintino',
    user: 'postgres',
    password: 'gotchasnotgoofy21',
    type: 'postgresql',
    debug: !IsProdEnvironment,
} as Parameters<typeof MikroORM.init>[0];