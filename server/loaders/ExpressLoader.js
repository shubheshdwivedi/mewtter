import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from '../routes';
import config from "../config/Config";
import logger from "../log/logger";
import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'redis';

export default async (app) => {
    const client = Redis.createClient(6379,'caching');
    client.on('connect', () => console.log('Connected to Redis'));
    client.on("error", (error) => console.error(error));
    const apiLimiter = new RateLimit({
        store: new RedisStore({
            client: client
        }),
        max: 100,
        delayMs: 0,
        windowMs: 60*1000,
        message:
            {
                data : "STOP! Too many requests created from this IP, please try again after 1 minute"
            }

    });
    app.use(cors());
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(apiLimiter);
    app.use(config.apiPrefix, routes());
    app.use(function(req, res, next){
        logger.error('404 page requested');
        res.status(404).send('This page does not exist!');
    });
    return app;
}
