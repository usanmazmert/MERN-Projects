import NotFoundError from "./NotFoundError.js";
import CreationError from "./CreationError.js";
import AuthenticationError from "./AuthenticationError.js"
import CustomError from "./CustomError.js";
const handler = (err, req, res, next) => {
    const errorMessage = err.message || "Something went wrong";
    const errorStatus = err.status || 500;
    res.status(errorStatus).send(errorMessage);
}


export {handler,CustomError, NotFoundError, CreationError, AuthenticationError};