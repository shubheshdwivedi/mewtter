import {Router} from 'express';
import logger from "../../log/logger";
import ResponseUtils from "../../utils/ResponseUtils";
import TweetService from "../../services/tweets/TweetService";

const route  = Router();

export default (router) => {
    router.use('/tweet', route);

    route.get('/:id',
        async (req, res, next) => {
            const userID = req.params.id;
            try {
                return res.json(ResponseUtils.successResponseObject(await TweetService.fetchTweets(userID)))
            } catch (err) {
                logger.error(err);
                return res.json(ResponseUtils.errorResponseObject(err.msg))
            }
        });

    route.post('/',
        async (req, res, next) => {
            const tweet = req.body;
            try {
                if(tweet.content === '')
                    return res.json(ResponseUtils.errorResponseObject('Empty tweet!'));
                return res.json(ResponseUtils.successResponseObject(await TweetService.createTweet(tweet)));
            } catch (err) {
                logger.error(err);
                return res.json(ResponseUtils.errorResponseObject(err.msg))
            }
        });


}