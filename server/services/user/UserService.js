import UserDao from "../../dao/user/UserDao";

const Follow = async (toFollow, user, op) => {
    const command =  (op === 'follow') ? "$addToSet" : "$pull";
    const operation = {
        following: {[command] : {"following": toFollow }},
        followers: {[command] : {"followers": user }}
    };

    await UserDao.updateFollowing(user, toFollow, operation.following);
    await UserDao.updateFollower(user, toFollow, operation.followers);
    return {
        op,
        toFollow
    };
};


const fetchFollow = async (id) => {
    return await UserDao.fetchRelations(id);
};

export default {
    Follow,
    fetchFollow
}