import User from "../../models/User";

const createUser = async (user) => User.create(user);

const findById = (id) => User.findById(id).exec();

const findByUsername = (username) =>
    User.findOne({username: username}).select('+password').exec();

const searchUser = async (query) => User.find({$text : {$search: query}});

const fetchFollowing = async (id) => User.findById(id, "following").exec();

const fetchRelations = async (id) => User.findById(id, "following followers").exec();

const updateFollowing = async (userId, influence, op) =>
    User.findOneAndUpdate({_id: userId}, op, {"new" : true}).exec();

const updateFollower = async (follower, userId, op) =>
    User.findOneAndUpdate({_id: userId}, op, {"new" : true}).exec();

export default {
    createUser,
    findByUsername,
    findById,
    searchUser,
    updateFollower,
    updateFollowing,
    fetchRelations,
    fetchFollowing
}