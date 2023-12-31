import express, { Express } from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import morgan from "morgan";
import "reflect-metadata";

import { serverConfig } from "./config/server-config";
import { dataConfig } from "./config/data-config";
import { ClientRoute } from "./routes/client-route";
import { ForumRoute } from "./routes/forum-route";
import { PostRoute } from "./routes/post-route";
import { FollowRoute } from "./routes/follow-route";
import { SoapRoute } from "./routes/soap-route";
import { DatabaseSetup } from "./config/db-setup";
import { seedDatabase } from "./config/db-seeding";

export class App {
  dataSource: DataSource;
  server: Express;

  constructor() {
    const clientRoute = new ClientRoute();
    const forumRoute = new ForumRoute();
    const postRoute = new PostRoute();
    const followRoute = new FollowRoute();
    const soapRoute = new SoapRoute();

    this.dataSource = new DataSource(dataConfig);

    this.server = express();
    this.server.use(
      (cors as (options: cors.CorsOptions) => express.RequestHandler)({})
    );
    this.server.use(morgan("combined"));
    this.server.use(
      "/api",
      express.json(),
      express.urlencoded({ extended: true }),
      clientRoute.getRoute(),
      forumRoute.getRoute(),
      postRoute.getRoute(),
      followRoute.getRoute(),
      soapRoute.getRoute()
    );
  }


  run() {
    this.dataSource
        .initialize()
        // .then( void DatabaseSetup())
        // .then( void seedDatabase()) // Only activate if needed
        .then(async () => {
            this.server.listen(serverConfig.port, () => {
                console.log(
                    `Server is running on http://localhost:${serverConfig.port}/api`
                );
            });
        })
        .catch((error) => {
            console.log(error);
        });
  }


}
