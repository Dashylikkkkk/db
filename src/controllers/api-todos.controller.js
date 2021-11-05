const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.get("/", asyncHandler(getToDo));
  router.get("/:id", asyncHandler(getToDoById));
  router.post("/", asyncHandler(createToDo));
  router.patch("/:id", asyncHandler(patchToDoById));
  router.delete("/", asyncHandler(deleteAllToDos));
  router.delete("/:id", asyncHandler(deleteToDoById));
}

async function getToDo(req, res, next) {
  const todos = await ToDo.findAll();

  res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
  const todo = await ToDo.findByPk(req.params.id);

  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }

  res.status(200).json(todo);
}

async function createToDo(req, res, next) {
  const todo = await ToDo.create(req.body);

  res.status(200).json(todo);
}

async function patchToDoById(req, res, next) {
  await ToDo.update(
    { ...req.body },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json({ message: "Updated" });
}

async function deleteAllToDos(req, res, next) {
  await ToDo.destroy({
    where: {
      userId: req.userId,
    },
  });
  res.status(200).json({ message: "Deteled" });
}

async function deleteToDoById(req, res, next) {
  let id = req.params.id;
  let todo = await ToDo.findByPk(id);

  if (!todo) {
    throw new ErrorResponse("No todo found", 404);
  }

  await todo.destroy();

  res.status(200).json({ message: "Deteled" });
}

initRoutes();

module.exports = router;
