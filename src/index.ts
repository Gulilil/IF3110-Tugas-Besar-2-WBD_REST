import { App } from "./app";
import { DatabaseSetup } from "./config/db-setup";

if (require.main === module) {
    const app = new App();
    app.run();
}
