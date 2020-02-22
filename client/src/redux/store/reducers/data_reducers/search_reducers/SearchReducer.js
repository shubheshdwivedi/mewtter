import {createReducer} from "redux-create-reducer";
import {constants as SearchConstants} from "../../../actions/search/SearchAction";

const initState = {
    search: {},
    isSearching: false,
    error: null
};

const SearchReducer = createReducer(initState, {
    [SearchConstants.SEARCH_START](state, action) {
        return {
            search: {},
            isSearching: true,
            error: null
        }
    },
    [SearchConstants.SEARCH_SUCCESS](state, action) {
        const searchResult = action.payload.data;
        return {
            search: searchResult,
            isSearching: false,
            error: null
        }
    },
    [SearchConstants.SEARCH_FAILURE](state, action) {
        return {
            search: {},
            isSearching: false,
            error: action.payload.message
        }
    }
});

export default SearchReducer