import { MikroORM } from '@mikro-orm/core';
import microConfig from './mikro-orm.config';
import express from 'express';
import bodyParser from 'body-parser';
import PostsController from './Controllers/PostsController';
import { DatabaseClientAsync } from './Clients/DatabaseClientAsync';
import { Post } from './Entities/Post';

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();
    app.use(bodyParser.json());
    
    const dbClient = new DatabaseClientAsync<Post>(Post, orm.em);
    const postController = new PostsController("/", express.Router(), dbClient);
    app.use("", postController.CreateRouter());

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
}

main().catch(err => {
    console.log(err)
});