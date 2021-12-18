const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const tasks = require("../dataBase/models/tasks");
const workers = require("../dataBase/models/workers");
const contract = require("../dataBase/models/contract");
const {
  asyncHandler,
  requireToken,
  getAdmin,
  getManager,
  getWorker,
  updateAdmin,
  updateManager,
  updateWorker,
  checkCreate,
} = require("../middlewares/middlewares");


const router = Router();

function initRoutes() {
  router.post(
    "/",
    asyncHandler(requireToken),
    asyncHandler(checkCreate),
    asyncHandler(createTask)
  );
  router.get(
    "/",
    asyncHandler(requireToken),
    asyncHandler(getAdmin),
    asyncHandler(getManager),
    asyncHandler(getWorker),
    asyncHandler(getAllTasks)
  );
  router.get(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(getAdmin),
    asyncHandler(getManager),
    asyncHandler(getWorker),
    asyncHandler(getTaskById)
  );
  router.patch(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(updateAdmin),
    asyncHandler(updateManager),
    asyncHandler(updateWorker),
    asyncHandler(updateTask)
  );
}

async function getAllTasks(req, res, next) {
  const task = await tasks.findAll();
  res.status(200).json({ task });
}

async function getTaskById(req, res, next) {
  const id_worker = req.id_worker;
  const task = await tasks.findAll({
    include: [
      {
        model: workers,
        require: true,
        where: { id: id_worker },
      },
    ],
  });
  res.status(200).json({ task });
}

async function createTask(req, res, next) {
  var task = undefined;
  var contracts = undefined;
  if (req.body.contract) {
    contracts = await contract.create(req.body.contact);
    task = await tasks.create({
      ...req.body,
      id_manager: req.token.id_worker,
      date_of_complition_worker: null,
      date_of_creation: new Date(),
      id_contract: contract.id,
    });
  } else {
    task = await tasks.create({
      ...req.body,
      id_manager: req.token.id_worker,
      date_of_creation: new Date(),
      isDdate_of_complition_workerone: null,
    });
  }
  res.status(200).json({ task: task, contracts: contracts });
}

async function updateTask(req, res, next) {
  const task = await tasks.update(req.updateData, {
    where: {
      id_task: req.params.id,
    },
    returning: true,
  });
  res.status(200).json(task);
}
initRoutes();

module.exports = router;
