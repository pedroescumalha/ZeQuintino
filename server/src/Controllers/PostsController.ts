import { IPostsController } from "src/Abstractions/Controller/IPostsController";
import { Post } from "../Entities/Post";
import { BaseController } from "./BaseController";

export default class PostsController extends BaseController<Post> implements IPostsController {

    public Delete(): IPostsController 
    {
        this.router.delete(`${this.basePath}:id`, async (req, res) => {
            try 
            {
                await this.dbClient.DeleteEntryAsync({id: Number(req.params.id)});
                res.sendStatus(204);
            } catch (error) {
                res.status(500).send(error);
            }
        });

        return this;
    }

    public GetAll(): IPostsController 
    {
        this.router.get(this.basePath, async (_, res) => {
            try 
            {
                const posts = await this.dbClient.GetAllEntriesAsync();
                res.send(posts);                    
            } 
            catch (error) 
            {
                res.status(500).send(error);
            }
        });
        
        return this;
    }

    public Post(): IPostsController 
    {
        this.router.post(this.basePath, async (req, res) => {
            try 
            {
                const post = await this.dbClient.PostEntryAsync({ title: req.body.title});
                res.status(201).send(post);                    
            } 
            catch (error) 
            {
                res.status(500).send(error);
            }
        });

        return this;
    }

    public Get(): IPostsController 
    {
        this.router.get(`${this.basePath}:id`, async (req, res) => {
            try 
            {
                const post = await this.dbClient.GetEntryAsync({id: Number(req.params.id)});
                res.send(post);                    
            } 
            catch (error) 
            {
                res.status(500).send(error);
            }
        });
        
        return this;
    }

    public Update(): IPostsController
    {
        this.router.put(`${this.basePath}:id`, async (req, res) => {
            try 
            {
                const post = await this.dbClient.GetEntryAsync({id: Number(req.params.id)});
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
                res.status(500).send(error);
            }
        });

        return this;
    }

    CreateRouter = () => this.Get().GetAll().Post().Delete().Update().router;
}