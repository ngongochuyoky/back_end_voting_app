const { isValidObjectId } = require('mongoose');
const yup = require('yup');

const voteSchema = yup.object({
    candidateIdList: yup.array().of(yup.number()),
    companyId: yup
        .string()
        .required('companyId must be a valid ObjectId')
        .trim()
        .transform((value) => {
            if (isValidObjectId(value)) return value;
            else '';
        }),
});

const decryptContentSchema = yup.object({
    privateKey: yup.string().trim().required(),
});

module.exports = { voteSchema, decryptContentSchema };
