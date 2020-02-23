import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = dotenv.config();

let databaseURL = (process.env.NODE_ENV === 'test') ? process.env.TEST_MONGO : process.env.LOCAL_MONGO;

if(!envFile)
    throw new Error("Env file not found!");

export default {
    port: parseInt(process.env.PORT, 10),
    apiPrefix: '/api',
    databaseURL: databaseURL,
    jwt_secret: process.env.JWT_SECRET
};