const routeNotFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource Not Found !!"
    };

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV !== "production" ? null : err.stack,
    })
}


export { routeNotFound, errorHandler };


// Leaning new && doubt topics
// ==========================================================================


// 1. stack: process.env.NODE_ENV !== "production" ? null : err.stack ..........................
// since we are in development we will check we need to get the full message, so we can send the full message,,,,
// but if NODE_ENV is in production then we will not send anything , because in production we don't need it but if it is equal devlopment we will print the error (so we  get full error message where it come from )