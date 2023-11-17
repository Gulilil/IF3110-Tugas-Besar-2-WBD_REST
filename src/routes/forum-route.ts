import { Router } from "express";

import { AuthenticationMiddleware } from "../middlewares/authentication-middleware";
import { ForumController } from "../controllers/forum-controller";

export class ForumRoute {
    authenticationMiddleware: AuthenticationMiddleware;
    forumController: ForumController;

    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.forumController = new ForumController();
    }

    getRoute() {
        return Router()
            .post(
                "/forum",
                this.authenticationMiddleware.authenticate(),
                this.forumController.store()
            )
            .post(
              "/forum/filter",
              this.authenticationMiddleware.authenticate(),
              this.forumController.getForumFilter()
            )
            .get(
                "/forum",
                this.authenticationMiddleware.authenticate(),
                this.forumController.index()
            )
            .get(
                "/forum/:id",
                this.authenticationMiddleware.authenticate(),
                this.forumController.getForum()
            )
            .delete(
                "/forum/:id",
                this.authenticationMiddleware.authenticate(),
                this.forumController.delete()
            )

    }
}
