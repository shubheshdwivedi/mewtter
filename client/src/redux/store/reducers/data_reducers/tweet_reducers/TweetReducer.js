import {createReducer} from "redux-create-reducer";
import {constants as fetchConstants} from "../../../actions/tweets/FetchTweetAction";
import {constants as postConstants} from "../../../actions/tweets/PostTweetAction";


const initState = {
    isTweeting: false,
    isFetching: false,
    tweets: [],
    error: null
};

const TweetReducer = createReducer(initState, {
    [postConstants.POST_TWEET_START](state, action) {
        return {
            ...state,
            isTweeting: true,
            error: null
        }
    },
    [postConstants.POST_TWEET_SUCCESS](state, action) {
        const tweets = [...state.tweets];
        tweets.unshift(action.payload.data[0]);
        return {
            ...state,
            isTweeting: false,
            tweets: tweets,
            error: null
        }
    },
    [postConstants.POST_TWEET_FAILURE](state, action) {
        return {
            ...state,
            isTweeting: false,
            error: action.payload.message
        }
    },
    [fetchConstants.FETCH_TWEET_SUCCESS](state, action) {
        return {
            ...state,
            isFetching: true,
            error:null
        }
    },
    [fetchConstants.FETCH_TWEET_SUCCESS](state, action) {
        const tweets = action.payload.data;
        tweets.sort((a,b) => {
            if(new Date(a.time).getTime() > new Date(b.time).getTime())
                return -1;
            return 1;
        });
        return {
            ...state,
            isFetching: false,
            tweets: tweets,
            error: null
        }
    },
    [fetchConstants.FETCH_TWEET_FAILURE](state, action) {
        return {
            ...state,
            isFetching: false,
            error: action.payload.message
        }
    }
});


export default TweetReducer;