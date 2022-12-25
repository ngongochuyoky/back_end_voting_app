const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongooseDelete = require('mongoose-delete');
const saltRounds = 10;
const Schema = mongoose.Schema;

const Company = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        company_name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

Company.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true }); //soft delete

Company.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('Company', Company);
