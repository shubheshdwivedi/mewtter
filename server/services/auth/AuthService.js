import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from "../../config/Config";
import UserDao from "../../dao/user/UserDao";
import ResponseUtils from "../../utils/ResponseUtils";

const responsePayloadCreator = (user) => {
    const token = jwt.sign({id: user._id, email: user.email, username: user.username},
        Config.jwt_secret, {expiresIn: '24h'});
    const userDetails = (({_id, username, email, first_name, last_name}) =>
        ({ _id,  username, email, first_name, last_name }))(user);
    let response = {};
    response['token'] = token;
    response['user'] = userDetails;
    return response;
};

const Login = async (userDO) => {
        const {username, password} = userDO;
            if (username && password) {
                const user = await UserDao.findByUsername(username);
                if(user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const response = responsePayloadCreator(user);
                        return ResponseUtils.successResponseObject(response);
                    }
                }
                return ResponseUtils.errorResponseObject('Incorrect username or password.');
            }
            return ResponseUtils.errorResponseObject('Authentication failed! Please check the request');
        };

const SignUp = async (userDO) => {
    const userData = {
        username: userDO.username,
        email: userDO.email,
        first_name: userDO.first_name,
        last_name: userDO.last_name,
        password: userDO.password
    };
    const user = await UserDao.createUser(userData);
    const response = responsePayloadCreator(user);
    return ResponseUtils.successResponseObject(response);
};



export default {
    Login,
    SignUp
};