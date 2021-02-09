const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
        seller: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        shops: [String],
        token: {
            type: String,
            default: ''
        },
        id: String
    },
    {collection : 'users'}
)

module.exports = mongoose.model('Users', userSchema);
