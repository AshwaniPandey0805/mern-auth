export const errorHandler = (success ,statusCode, message) => {
    const error = new Error();
    error.success = success;
    error.message = message;
    error.statusCode = statusCode;
    return error;
}