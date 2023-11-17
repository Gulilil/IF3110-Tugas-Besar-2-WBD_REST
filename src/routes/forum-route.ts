import { Router } from "express";

import { AuthenticationMiddleware } from "../middlewares/authentication-middleware";
import { SOAPMiddleware } from "../middlewares/soap-middleware";
import { ForumController } from "../controllers/forum-controller";

export class ForumRoute {
    authenticationMiddleware: AuthenticationMiddleware;
    soapMiddleware: SOAPMiddleware;
    forumController: ForumController;

    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.soapMiddleware = new SOAPMiddleware();
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
