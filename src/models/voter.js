const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongooseDelete = require('mongoose-delete');
const saltRounds = 10;
const Schema = mongoose.Schema;

const Voter = new Schema(
    {
        full_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        election_address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

Voter.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true }); //soft delete

Voter.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('Voter', Voter);
