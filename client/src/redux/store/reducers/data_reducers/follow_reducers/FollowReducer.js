import {createReducer} from "redux-create-reducer";
import {constants as AddFollowConstants} from "../../../actions/user/AddFollowAction";
import {constants as FetchFollowConstants} from "../../../actions/user/FetchFollowAction";

const initState = {
    following: [],
    followers: [],
    isFollowing: false,
    error: null
};

const FollowReducer = createReducer(initState, {
    [FetchFollowConstants.FOLLOW_SUCCESS](state, action) {
        const {following, followers} = action.payload.data;
        return {
            ...state,
            following,
            followers,
            error: null
        }
    },
    [FetchFollowConstants.FOLLOW_FAILURE](state, action) {
        return {
            ...state,
            error: action.payload.message
        }
    },
    [AddFollowConstants.ADD_FOLLOW_START](state, action) {
        return {
            ...state,
            isFollowing: false,
            error: null
        }
    },
    [AddFollowConstants.ADD_FOLLOW_SUCCESS](state, action) {
        const {op, toFollow} = action.payload.data;
        let following = [...state.following];
        if(following.indexOf(toFollow) === -1 && op === 'follow')
            following.push(toFollow);
        else if(op === 'unfollow')
            following = following.filter(e => e !== toFollow);
        return {
            ...state,
            following,
            isFollowing: true,
            error: null
        }
    },
    [AddFollowConstants.ADD_FOLLOW_FAILURE](state, action) {
        return {
            ...state,
            error: action.payload.message
        }
    }
});


export default FollowReducer;