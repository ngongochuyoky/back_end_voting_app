const yup = require('yup');

const createSchema = yup.object({
    companyId: yup
        .string()
        .required('id must be a valid ObjectId')
        .trim()
        .transform((value) => {
            if (isValidObjectId(value)) return value;
            else '';
        }),
    electionAddress: yup.string().trim().required(),
});

const updateVotersSchema = yup.object({
    voters: yup.array().of(yup.number()),
})

const updateTimeStartSchema = yup.object({
    timeOut: yup.date().required(),
})

module.exports = { createSchema, updateVotersSchema, updateTimeStartSchema };
