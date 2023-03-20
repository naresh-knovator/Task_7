const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(401);
    next(error)
}

const errorHandle = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
        status: "failure",
        message: err.message,
        stack: err.stack
    })
    next();
}

module.exports = {
    notFound,
    errorHandle
}