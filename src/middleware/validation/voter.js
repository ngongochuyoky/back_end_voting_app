const yup = require('yup');

const registerSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().trim().required(),
    fullName: yup.string().trim().required(),
});

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().trim().required(),
});

const createSchema = yup.object({
    email: yup.string().email().required(),
    electionAddress: yup.string().trim().required(),
    fullName: yup.string().trim().required(),
});

const updateSchema = yup.object({
    fullName: yup.string().trim().required(),
    password: yup.string().trim().required(),
    electionName: yup.string().trim().required(),
});


module.exports = { registerSchema, loginSchema, createSchema, updateSchema };
