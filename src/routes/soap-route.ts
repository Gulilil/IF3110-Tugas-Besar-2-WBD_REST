import { Router } from "express";

import { AuthenticationMiddleware } from "../middlewares/authentication-middleware";
import { SoapController } from "../controllers/soap-controller";

export class SoapRoute {
    authenticationMiddleware: AuthenticationMiddleware;
    soapController: SoapController;

    constructor() {
        this.authenticationMiddleware = new AuthenticationMiddleware();
        this.soapController = new SoapController();
    }

    getRoute() {
        return Router()
          .post(
            "/soap",
            this.authenticationMiddleware.authenticate(),
            this.soapController.link()
          )
          .get(
            "/soap",
            this.authenticationMiddleware.authenticate(),
            this.soapController.get()
          )
          .put(
            "/soap",
            this.authenticationMiddleware.authenticate(),
            this.soapController.unlink()
          )

    }
}
