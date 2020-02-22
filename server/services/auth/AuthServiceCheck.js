import jwt from 'jsonwebtoken';
import Config from "../../config/Config";

const checkToken = (req, res, next) => {
    let token = req.headers['x-auth-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer '))
            token = token.slice(7, token.length);
        jwt.verify(token, Config.jwt_secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    data: null,
                    error: {
                        errorCode: 401,
                        message: 'Token is not valid'
                    }
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            data: null,
            error: {
                errorCode: 401,
                message: 'Auth token is not supplied'
            }
        });
    }
};

export default checkToken;