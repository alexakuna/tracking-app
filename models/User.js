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
    shops: Array,
    token: {
        type: String,
        default: ''
    },
    id: String,
    api: String
    },
    {collection : 'users-test'}
)

module.exports = mongoose.model('Users', userSchema);
