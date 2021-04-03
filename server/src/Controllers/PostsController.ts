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
                return res.sendStatus(204);
            } catch (error) {
                return res.status(500).send(error.message);
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
                return res.send(posts);                    
            } 
            catch (error) 
            {
                return res.status(500).send(error.message);
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
                return res.status(201).send(post);                    
            } 
            catch (error) 
            {
                return res.status(500).send(error.message);
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
                    return res.status(404).send("Post not found");
                }
                
                return res.send(post);
            }
            catch (error) 
            {
                return res.status(500).send(error.message);
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
                    return res.send(post);    
                }

                return res.status(409).send("Post not found in the database");
            }
            catch (error) 
            {
                return res.status(500).send(error.message);
            }
        });

        return this;
    }

    CreateRouter = () => this.Get().GetAll().Post().Delete().Update().router;
}