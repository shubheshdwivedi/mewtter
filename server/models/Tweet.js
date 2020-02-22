import mongoose from 'mongoose';
import mongooseSearch from '../utils/partialSearch';

const TweetSchema = new mongoose.Schema({
    content: {
        type: String,
        index: true,
        required: true
    },
    topics: [{
        type: String
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

TweetSchema.plugin(mongooseSearch);
TweetSchema.index({topics: 'text'});

export default mongoose.model("Tweet", TweetSchema);