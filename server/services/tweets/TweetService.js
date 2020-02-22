import TweetDao from "../../dao/tweet/TweetDao";
import UserDao from "../../dao/user/UserDao";

const createTweet = async (data) => {
    const tweet = await TweetDao.createTweet(data);
    return await TweetDao.findOneTweet(tweet._id);
};

const fetchTweets = async (userID) => {
    const followingArray = await UserDao.fetchFollowing(userID);
    followingArray.following.push(userID);
    const queryObject = { 'author' : { '$in': followingArray.following }};
    return await TweetDao.fetchTweets(queryObject);
};

export default {
    createTweet,
    fetchTweets
};