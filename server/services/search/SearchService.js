import TweetDao from "../../dao/tweet/TweetDao";
import UserDao from "../../dao/user/UserDao";

const search = async (query) => {
    const users = await UserDao.searchUser(query);
    const tweets = await TweetDao.searchTweets(query);
    return {
        users,
        tweets
    };
};

export default  {
    search
};