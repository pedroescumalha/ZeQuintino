import { injectable } from "inversify";
import { Routes } from "../Constants/Routes";
import { IPostsController } from "../Abstractions/Controller/IPostsController";
import { Post } from "../Entities/Post";
import { BaseController } from "./BaseController";

@injectable()
export default class PostsController extends BaseController implements IPostsController {

    basePath = Routes.V1.Posts;

    public Delete(): IPostsController 
    {
        this.router.delete(`${this.basePath}:id`, async (req, res) => {
            try 
            {
                await this.dbClient.DeleteEntryAsync(Post, {id: Number(req.params.id)});
                res.sendStatus(204);
            } catch (error) {
                res.status(500).send(error.message);
            }
        });

        return this;
    }

    public GetAll(): IPostsController 
    {
        this.router.get(this.basePath, async (_, res) => {
            try 
            {
                const posts = await this.dbClient.GetAllEntriesAsync(Post);
                res.send(posts);                    
            } 
            catch (error) 
            {
                res.status(500).send(error.message);
            }
        });
        
        return this;
    }

    public Post(): IPostsController 
    {
        this.router.post(this.basePath, async (req, res) => {
            try 
            {
                const post = await this.dbClient.PostEntryAsync(Post, { title: req.body.title});
                res.status(201).send(post);                    
            } 
            catch (error) 
            {
                res.status(500).send(error.message);
            }
        });

        return this;
    }

    public Get(): IPostsController 
    {
        this.router.get(`${this.basePath}:id`, async (req, res) => {
            try 
            {
                const post = await this.dbClient.GetEntryAsync(Post, {id: Number(req.params.id)});
                if (post == null)
                {
                    res.status(404).send("Post not found");
                }
                else
                {
                    res.send(post);
                }
            }
            catch (error) 
            {
                res.status(500).send(error.message);
            }
        });
        
        return this;
    }

    public Update(): IPostsController
    {
        this.router.put(`${this.basePath}:id`, async (req, res) => {
            try 
            {
                const post = await this.dbClient.GetEntryAsync(Post, {id: Number(req.params.id)});
                if(post != null)
                {
                    post.title = req.body.title;
                    await this.dbClient.UpdateEntryAsync(post);
                    res.send(post);    
                }

                res.status(409).send("Post not found in the database");
            }
            catch (error) 
            {
                res.status(500).send(error.message);
            }
        });

        return this;
    }

    CreateRouter = () => this.Get().GetAll().Post().Delete().Update().router;
}