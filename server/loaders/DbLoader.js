import mongoose from 'mongoose';
import config from '../config';

export default async () => {
    const connection = await mongoose.connect(config.databaseURL, {
        useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false  });
    if(!connection)
        console.log("Db error" + connection);
    return connection.connection.db;
};