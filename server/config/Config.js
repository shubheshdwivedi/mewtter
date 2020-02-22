import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = dotenv.config();

if(!envFile)
    throw new Error("Env file not found!");

export default {
    port: parseInt(process.env.PORT, 10),
    apiPrefix: '/api',
    databaseURL: process.env.LOCAL_MONGO,
    jwt_secret: process.env.JWT_SECRET
};