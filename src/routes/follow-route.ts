import { Router } from "express";

import { AuthenticationMiddleware } from "../middlewares/authentication-middleware";
import { SOAPMiddleware } from "../middlewares/soap-middleware";
import { FollowController } from "../controllers/follow-controller";

export class FollowRoute {
    authenticationMiddleware: AuthenticationMiddleware;
    soapMiddleware: SOAPMiddleware;
    followController: FollowController;

    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.soapMiddleware = new SOAPMiddleware();
        this.followController = new FollowController();
    }

    getRoute() {
        return Router()
            .post(
                "/follow/:followeeId",
                this.authenticationMiddleware.authenticate(),
                this.followController.follow()
            )
            .delete(
                "/follow/:followeeId",
                this.authenticationMiddleware.authenticate(),
                this.followController.unfollow()
            )
            .get(
                "/followers",
                this.authenticationMiddleware.authenticate(),
                this.followController.listFollowers()
            )
            .get(
                "/followees",
                this.authenticationMiddleware.authenticate(),
                this.followController.listFollowees()
            )
    }
}
