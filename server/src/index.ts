import { MikroORM } from '@mikro-orm/core';
import microConfig from './mikro-orm.config';
import express from 'express';
import PostsController from './Controllers/PostsController';
import { DatabaseClientAsync } from './Clients/DatabaseClientAsync';
import { Post } from './Entities/Post';
import { App } from './App';

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const dbClient = new DatabaseClientAsync<Post>(Post, orm.em);
    const postController = new PostsController(express.Router(), dbClient);
    const app = new App(postController);
    app.init();
}

main().catch(err => {
    console.log(err)
});