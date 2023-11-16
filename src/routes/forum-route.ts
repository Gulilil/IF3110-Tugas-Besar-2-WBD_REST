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
            .get(
                "/forum",
                this.authenticationMiddleware.authenticate(),
                this.forumController.index()
            )
            .delete(
                "/forum/:id",
                this.authenticationMiddleware.authenticate(),
                this.forumController.delete()
            )
    }
}
