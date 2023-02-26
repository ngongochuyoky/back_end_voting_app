# Online Voting System, Backend
## Introduction
RESTful API based on Expressjs.

## Error Handling
The errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the next(error) function, where Express will catch and process them.
![Middleware](https://user-images.githubusercontent.com/54812014/221349625-6617f83b-eb57-48b8-ba1c-1737cbc16c31.png)

## Authentication
***src/middleware/Authentication.js***
```
const jwt = require('jsonwebtoken');

authenticateToken(req, res, next) {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
          if (err) {
              throw createError(commonError.UNAUTHORIZED, { message: 'Invalid token'});
          }
          else next();
      });
  }
```
## Validation with Schema library
- Yup: schema-based authentication library

***src/middleware/validate/ballot.js***
```
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

```

***src/middleware/ValidationMiddleware.js***
```
const createError = require('../lib/error/errorFactory');

const validateParams = (schema) => async (req, res, next) => {
    let params = req.params;
    try {
        params = await schema.validate(params, { abortEarly: false, stripUnknown: true });
        req.params = params;
        next();
    } catch (err) {
        next(createError(err));
    }
};

const validateBody = (schema) => async (req, res, next) => {
    let body = req.body;
    try {
        //abortEarly: false : không dừng xác thực khi thấy giá trị không hợp lệ đầu tiên
        //stripUnknown: true : xóa những trường không được định nghĩa trong schema
        body = await schema.validate(body, { abortEarly: false, stripUnknown: true });
        req.body = body;
        next();
    } catch (err) {
        next(createError(err));
    }
};
```
## Format response
**/lib/response/index.js**
```
function formatError(error, overrides = {}) {
    const newError = JSON.parse(JSON.stringify(error));
    newError.statusCode = undefined;
    return {
        error: {
            ...newError,
        },
        status: 'error',
        ...overrides,
    };
}

function formatSuccess(result, overrides = {}) {
    return {
        data: result,
        status: 'success',
        ...overrides,
    };
}
```
## Project structure for an Express REST API
 ![Project structure](https://user-images.githubusercontent.com/54812014/221400431-84c81013-6fe5-43ea-8d98-2a05583d9962.PNG)

## Routes
- A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern.
- The express.Router middleware as it allows me to group together route handlers for a specific part of the site and access them using a common route prefix.

***/src/routes/ballot.js***
```
const { validateBody, validateParams } = require('../middleware/ValidationMiddleware');
const ballotSchema = require('../middleware/validation/ballot');
const router = express.Router();

router.post(
    '/:id/decryptContent',
    authentication.authenticateToken,
    validateParams(pathParameter.pathIdSchema), 
    validateBody(ballotSchema.decryptContentSchema),
    ballotController.decryptContent,
);
```
***/src/routes/index.js***
```
const ballotRouter = require('./ballot');

app.use('/api/ballot', ballotRouter);
app.use(notFound);
app.use(errorHandler);
```
## Model
- Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
- mongoose-delete is simple and lightweight plugin that enables soft deletion of documents in MongoDB
***src/models/ballot.js***
```
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
```
## Controller
***src/controllers/BallotController.js***
```
class BallotController {
  ...
    // [POST] ballot/:id/decryptContent
    async decryptContent(req, res, next) {
        try {
            const ballot = await Ballot.findById(req.params.id);
            const key = await Key.findOne({
                company: ballot.company,
            });

            const secretKey = rsaDecrypt(key.dbSecretKey, req.body.privateKey);

            if (secretKey === process.env.SECRET_KEY) {
                const content = aesDecrypt(ballot.content, secretKey);
                res.json(formatSuccess({ content: JSON.parse(content), voterId: ballot.voter }));
            } else throw createError(commonError.INTERNAL_SERVER_ERROR, { message: 'Wrong privateKey!!' });
        } catch (err) {
            next(err);
        }
    }
    
  ...
}
```
