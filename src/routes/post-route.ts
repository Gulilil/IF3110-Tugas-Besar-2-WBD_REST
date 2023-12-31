import { Router } from "express";

import { AuthenticationMiddleware } from "../middlewares/authentication-middleware";
import { PostController } from "../controllers/post-controller";

export class PostRoute {
    authenticationMiddleware: AuthenticationMiddleware;
    postController: PostController;

    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.postController = new PostController();
    }

    getRoute() {
        return Router()
            .post(
                "/post",
                this.authenticationMiddleware.authenticate(),
                this.postController.store()
            )
            .get(
                "/post",
                this.authenticationMiddleware.authenticate(),
                this.postController.indexAuthor()
            )
            .get(
                "/post/:id",
                this.authenticationMiddleware.authenticate(),
                this.postController.index()
            )
            .get(
              "/post/forum/:id",
              this.authenticationMiddleware.authenticate(),
              this.postController.indexForum()
          )
            .delete(
                "/post/:id",
                this.authenticationMiddleware.authenticate(),
                this.postController.delete()
            )
            .put(
              "/post/:id",
              this.authenticationMiddleware.authenticate(),
              this.postController.update()
            )
    }
}
