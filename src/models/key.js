const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongooseDelete = require('mongoose-delete');
const CryptoJS = require('crypto-js');

const saltRounds = 10;
const Schema = mongoose.Schema;

const Key = new Schema(
    {
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
        },
        hashPrivateKey: {
            type: String,
            required: true,
        },
        publicKey: {
            type: String,
            required: true,
        },
        dbSecretKey: {
            type: String,
            required: true,
        }
    },
    { timestamps: true },
);

Key.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true }); //soft delete

// Key.pre('save', function (next) {
//     this.hashPrivateKey = bcrypt.hashSync(this.hashPrivateKey, saltRounds);
//     next();
// });

Key.pre('save', function (next) {
    this.hashPrivateKey = CryptoJS.MD5(this.hashPrivateKey).toString(CryptoJS.enc.Hex);
    next();
});

module.exports = mongoose.model('Key', Key);
