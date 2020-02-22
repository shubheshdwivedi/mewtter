import config from "./config/Config";
import express from 'express';
import loader from './loaders';
import logger from "./log/logger";

async function startServer() {
    const app = express();
    await loader.express(app);
    await loader.database();
    app.listen(config.port, err => {
        if (err) {
            logger.error("Error : \n"+err);
            process.exit(1);
            return;
        }
        console.log("Server up!");
        logger.info("Server started on port " + config.port);
    });
}

startServer();