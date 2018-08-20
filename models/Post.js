const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    likes: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
    }],
    comments: [{
        text: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        avatar: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        date : {
            type: Date,
            default : Date.now
        }
    }],


});

module.exports = Post = mongoose.model('posts', postSchema);