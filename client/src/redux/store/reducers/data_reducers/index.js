import AuthReducer from "./auth_reducers";
import TweetReducer from "./tweet_reducers";
import SearchReducer from "./search_reducers";
import FollowReducer from "./follow_reducers";
import {combineReducers} from "redux";
const DataReducer = combineReducers({
    AuthReducer,
    TweetReducer,
    SearchReducer,
    FollowReducer
});
export default DataReducer;