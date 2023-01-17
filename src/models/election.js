const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Election = new Schema(
    {
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
        },
        voters: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Voter',
            },
        ],
        election_address: {
            type: String,
            require: true,
        },
        startTime: {
            type: Date,
            default: null
        },
        time: {
            type: Date,
            default: null
        }
    },
    { timestamps: true },
);

Election.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true }); //soft delete

module.exports = mongoose.model('Election', Election);

