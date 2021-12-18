const { Router } = require("express");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");
const Token = require("../dataBase/models/Token");
const workers = require("../dataBase/models/workers");


const router = Router();

function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(receiveInfo));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logout));
}

async function receiveInfo(req, res, _next) {
  let worker = await workers.findByPk(req.id_worker, {
    attributes: [
      'id', 'worker_name'
    ]
  });
  res.status(200).json(worker);
}

async function logout(req, res, _next) {
  
  await Token.destroy({
    where: {
      value: req.header("token"),
    },
  });

  res.status(200).json({ message: "Logged out..." });
}

initRoutes();

module.exports = router;
