const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const { asyncHandler } = require("../middlewares/middlewares");
const User = require("../dataBase/models/User.model");
const { Op } = require("sequelize");
const Token = require("../dataBase/models/Token.model");
const { nanoid } = require("nanoid");

const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
}

async function registration(req, res, _next) {
  let user = await User.findOne({
    where: {
      [Op.or]: {
        email: req.body.email,
        login: req.body.login,
      },
    },
  });

  user = await User.create(req.body);

  res.status(200).json(user);
}

async function login(req, res, _next) {
  let user = await User.findOne({
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });

  if (!user) {
    throw new ErrorResponse("wrong login or password", 400);
  }

  const token = await Token.create({ userId: user.id, value: nanoid(128) });

  res.status(200).json({ accessToken: token.value });
}

initRoutes();

module.exports = router;
