import createRequest from "../CreateRequest";

const SearchRequest = (data) => {
    return createRequest('SearchRequest', data, 'post', '/search');
};
export default SearchRequest;