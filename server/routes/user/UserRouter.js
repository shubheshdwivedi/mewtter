import {Router} from 'express';
import logger from "../../log/logger";
import ResponseUtils from "../../utils/ResponseUtils";
import UserService from "../../services/user/UserService";
import checkToken from "../../services/auth/AuthServiceCheck";

const route  = Router();

export default (router) => {
    router.use('/user', route);

    route.get('/follow/:id', checkToken,
        async (req, res, next) => {
            const id = req.params.id;
            try {
                return res.json(ResponseUtils.successResponseObject(await UserService.fetchFollow(id)));
            } catch (err) {
                logger.error(err);
                return res.json(ResponseUtils.errorResponseObject(err.msg))
            }
        });

    route.post('/follow', checkToken,
        async (req, res, next) => {
            const {toFollow, user, op} = req.body;
            try {
                return res.json(ResponseUtils.successResponseObject(await UserService.Follow(toFollow, user, op)));
            } catch (err) {
                logger.error(err);
                return res.json(ResponseUtils.errorResponseObject(err.msg))
            }
        });



}