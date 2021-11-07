const { Router } = require("express");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");

const router = Router();

function initRoutes() {
  router.get("/:id", asyncHandler(requireToken), asyncHandler(receiveInfo));
  router.patch("/:id", asyncHandler(requireToken), asyncHandler(updateInfo));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logout));
}

async function receiveInfo(req, res, _next) {
  let user = await User.findByPk(req.userId);
  res.status(200).json(user);
}

async function updateInfo(req, res, _next) {
  let user = await User.findByPk(req.userId);

  user = await user.update(req.body, {
    returning: true,
  });

  res.status(200).json(user);
}

async function logout(req, res, _next) {
  let token = await Token.findOne({
    where: {
      value: req.headers.token,
    },
  });

  await token.destroy();

  res.status(200).json({ message: "Logged out..." });
}

initRoutes();

module.exports = router;
