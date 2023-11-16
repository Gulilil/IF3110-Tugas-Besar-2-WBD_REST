import { Router } from "express";

import { PhpController } from "../controllers/php-controller";

export class PhpRoute {
    phpController : PhpController

    constructor() {
        this.phpController = new PhpController();
    }

    getRoute() {
        return Router()
            .get(
                "/php/anime",
                this.phpController.get()
            )
    }

}
