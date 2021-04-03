import { IController } from "./IController";
import { IDelete } from "./IDelete";
import { IGet } from "./IGet";
import { IPost } from "./IPost";
import { IPut } from "./IPut";

export interface IPostsController extends IController, IGet<IPostsController>, IPost<IPostsController>, IDelete<IPostsController>, IPut<IPostsController>
{
}