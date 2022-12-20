const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

const Voter = new Schema({
    full_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        default: 'http://localhost:3001/images/anh1.jpg',
    },
    election_address: {
        type: String,
        // require: true
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

Voter.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
})

module.exports = mongoose.model('Voter', Voter);
