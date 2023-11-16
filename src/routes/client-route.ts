import { Router } from "express";

import { AuthenticationMiddleware } from "../middlewares/authentication-middleware";
import { ClientController } from "../controllers/client-controller";

export class ClientRoute {
    authenticationMiddleware: AuthenticationMiddleware;
    clientController: ClientController;

    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.clientController = new ClientController();
    }

    getRoute() {
        return Router()
            .post("/client/token", this.clientController.token())
            .post("/client", this.clientController.store())
            .get("/client", this.clientController.index())
            .get("/client/:id", this.clientController.getUser())
            .get(
                "/client/check", 
                this.authenticationMiddleware.authenticate(),
                this.clientController.check()
            )
    }
}
