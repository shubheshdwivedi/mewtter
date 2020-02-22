import {Router} from 'express';
import indexRouter from "./IndexRouter";
import AuthRouter from "./auth/AuthRouter";
import TweetRouter from "./tweets/TweetRouter";
import UserRouter from "./user/UserRouter";
import SearchRouter from "./search/SearchRouter";

export default () => {
    const router = Router();
    indexRouter(router);
    AuthRouter(router);
    TweetRouter(router);
    SearchRouter(router);
    UserRouter(router);
    return router;
}

/*
 API FORMAT
  API response object: {
    success: true/false
    data: null / {data_payload}
    error: null / {error_payload}
 }
*/

