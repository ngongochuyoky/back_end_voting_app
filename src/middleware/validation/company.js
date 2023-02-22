const yup = require('yup');

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const registerSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    companyName: yup.string().trim().required(),
});

const resultMailSchema = yup.object({
    electionAddress: yup.string().trim().required(),
    electionName: yup.string().trim().required(),
    winners: yup.array(yup.object({
        positionName: yup.string().trim().required(),
        name: yup.string().trim().required(),
        voteCount: yup.number().required(),
        email: yup.string().email().required(),
    }))
})

module.exports = { loginSchema, registerSchema, resultMailSchema };
