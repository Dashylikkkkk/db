const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const notFound = (req, _res, next) => {
  next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
  console.log("Ошибка", {
    message: err.message,
    stack: err.stack,
  });
  res.status(err.code || 500).json({
    message: err.message,
  });
};

const requireToken = async (req, _res, next) => {
  const token = req.header("token");

  if (!token) {
    throw new ErrorResponse("token wasn't send", 403);
  }

  let tokenFind = await Token.findOne({
    where: {
      value: token,
    },
  });

  if (!tokenFind) {
    throw new ErrorResponse("invalid token", 403);
  }

  req.userId = tokenFind.userId;
  next();
};

module.exports = {
  asyncHandler,
  syncHandler,
  notFound,
  errorHandler,
  requireToken,
};
