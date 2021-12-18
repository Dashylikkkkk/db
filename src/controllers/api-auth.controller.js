const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const { asyncHandler } = require("../middlewares/middlewares");
const workers = require("../dataBase/models/workers");
const Token = require("../dataBase/models/Token");
const { nanoid } = require("nanoid");

const router = Router();

function initRoutes() {
  router.post("/login", asyncHandler(login));
}

async function login(req, res, _next) {
  const worker = await workers.findOne({
    where: {
      login: req.body.login,
      password: req.body.password,
    },
  });

  if (!worker) {
    throw new ErrorResponse("wrong login or password", 400);
  }

  const token = await Token.create({ id_worker: worker.id, value: nanoid(128) });

  res.status(200).json({ accessToken: token.value, worker_position: worker.worker_position });
}

initRoutes();

module.exports = router;
