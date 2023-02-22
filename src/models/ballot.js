const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Ballot = new Schema(
    {
        voter: {
            type: Schema.Types.ObjectId,
            ref: 'Voter',
            required: true,
        },
        content: {
            type: String,
            require: true,
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
        isCheck: {
            type: Boolean,
            require: true,
            default: false,
        },
    },
    { timestamps: true },
);

Ballot.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true }); //soft delete

module.exports = mongoose.model('Ballot', Ballot);
