import {Router} from 'express';

const route  = Router();

export default (router) => {
    router.use('/', route);
    route.get("/", (req, res) => {
        res.send("hello");
    })
}