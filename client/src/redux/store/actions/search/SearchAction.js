import SearchRequest from "../../../../connect/requests/search/SearchRequest";
import {createAsyncAction, module} from "redux-create-actions";
import createApiAction from "../../utils/CreateApiAction";

const {
    actions,
    constants
} = module('', {
    search: createAsyncAction('SEARCH')
});

const searchRequest = SearchRequest;
const searchAction = (data) => createApiAction(data, actions.search, searchRequest,'','','/search');

export {constants};
export default searchAction;
