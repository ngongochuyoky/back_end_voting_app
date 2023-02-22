const { isValidObjectId } = require('mongoose');
const yup = require('yup');

const pathIdSchema = yup.object({
    id: yup
        .string()
        .required('id must be a valid ObjectId')
        .trim()
        .transform((value) => {
            if (isValidObjectId(value)) return value;
            else '';
        }),
});

const pathCompanyIdSchema = yup.object({
    companyId: yup
        .string()
        .required('companyId must be a valid ObjectId')
        .trim()
        .transform((value) => {
            if (isValidObjectId(value)) return value;
            else '';
        }),
});

const pathVoterIdSchema = yup.object({
    voterId: yup
        .string()
        .required('voterId must be a valid ObjectId')
        .trim()
        .transform((value) => {
            if (isValidObjectId(value)) return value;
            else '';
        }),
});

const pathElectionAddressSchema = yup.object({
    electionAddress: yup.string().required('electionAddress must be a valid String').trim(),
});

const pathSearchVoteSchema = yup.object({
    voterId: yup
        .string()
        .required('voterId must be a valid ObjectId')
        .trim()
        .transform((value) => {
            if (isValidObjectId(value)) return value;
            else '';
        }),
    companyId: yup
        .string()
        .required('companyId must be a valid ObjectId')
        .trim()
        .transform((value) => {
            if (isValidObjectId(value)) return value;
            else '';
        }),
});

module.exports = {
    pathIdSchema,
    pathCompanyIdSchema,
    pathVoterIdSchema,
    pathElectionAddressSchema,
    pathSearchVoteSchema,
};
