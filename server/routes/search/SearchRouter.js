import {Router} from 'express';
import logger from "../../log/logger";
import ResponseUtils from "../../utils/ResponseUtils";
import SearchService from "../../services/search/SearchService";

const route  = Router();

export default (router) => {
    router.use('/search', route);

    route.post('/',
        async (req, res, next) => {
            const {query} = req.body;
            try {
                if(query)
                    return res.json(ResponseUtils.successResponseObject(await SearchService.search(query)));
                return res.json(ResponseUtils.errorResponseObject("Empty search query!"))
            } catch (err) {
                logger.error(err);
                return res.json(ResponseUtils.errorResponseObject(err.msg))
            }
        });


}