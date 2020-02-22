import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import mongooseSearch from 'mongoose-partial-full-search';
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        validator: (value) => validator.isEmail(value)
    },
    password: {
        type: String,
        select: false
    },
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        index: true,
        required: true
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
    }],
    profileImageURL: {
        type:String,
        required: true,
        default: 'http://placekitten.com/g/45/45'
    }
});

UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
UserSchema.index({
    username: 'text',
    first_name: 'text',
    last_name:  'text'
});
UserSchema.plugin(mongooseSearch);
export default mongoose.model("User", UserSchema);