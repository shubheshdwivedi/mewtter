import Tweet from "../../models/Tweet";

const createTweet = async (tweet) => Tweet.create(tweet);

const fetchTweets = async (queryObject) => Tweet.find(queryObject).populate(
    'author', 'username first_name last_name').exec();

const findOneTweet = async (id) => Tweet.find({_id: id}).populate(
    'author', 'username first_name last_name').exec();

const searchTweets = async (query) => Tweet.search(query,
    'author', 'username first_name last_name');


export default {
    createTweet,
    fetchTweets,
    searchTweets,
    findOneTweet
};