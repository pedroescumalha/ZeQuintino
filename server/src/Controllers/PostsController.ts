import { IPostsController } from "src/Abstractions/Controller/IPostsController";
import { Post } from "../Entities/Post";
import { BaseController } from "./BaseController";

export default class PostsController extends BaseController implements IPostsController {

    public Delete(): IPostsController 
    {
        this.router.delete("/:id", async (req, res) => {
            try 
            {
                await this.dbClient.nativeDelete(Post, {id: Number(req.params.id)});
                res.sendStatus(204);
            } catch (error) {
                res.status(500).send(error);
            }
        });

        return this;
    }

    public GetAll(): IPostsController 
    {
        this.router.get("/", async (_, res) => {
            try 
            {
                const posts = await this.dbClient.find(Post, {});
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
        this.router.post("/", async (req, res) => {
            const post = this.dbClient.create(Post, { title: req.body.title});

            try 
            {
                await this.dbClient.persistAndFlush(post);
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
        this.router.get("/:id", async (req, res) => {
            try 
            {
                const post = await this.dbClient.findOneOrFail(Post, {id: Number(req.params.id)});
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
        this.router.put("/:id", async (req, res) => {
            try 
            {
                const post = await this.dbClient.findOne(Post, {id: Number(req.params.id)});
                if(post != null)
                {
                    post.title = req.body.title;
                    await this.dbClient.persistAndFlush(post);
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