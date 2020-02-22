import {Router} from 'express';
import AuthService from "../../services/auth/AuthService";
import logger from "../../log/logger";
import ErrorCodes from "../../scripts/ErrorCodes";
import ResponseUtils from "../../utils/ResponseUtils";

const route  = Router();

export default (router) => {
    router.use('/auth', route);

    // LOGIN NEW USER
    route.post('/login',
        async (req, res, next) => {
            const userDao = req.body;
            try {
                const loginResult = await AuthService.Login(userDao);
                return res.json(loginResult);
            } catch (err) {
                logger.error(err);
                return res.json(ResponseUtils.errorResponseObject(err.msg))
            }
        });

    // REGISTER NEW USER
    route.post('/register',
        async (req, res, next) => {
            const userDao = req.body;
            try {
                const loginResult = await AuthService.SignUp(userDao);
                return res.json(loginResult);
            } catch (err) {
                logger.error(err);
                return res.json(ResponseUtils.errorResponseObject(ErrorCodes[err.code]));
            }
        });


}