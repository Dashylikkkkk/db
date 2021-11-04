const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ToDo = require("../dataBase/models/ToDo.model");
const { asyncHandler } = require("../middlewares/middlewares");
const ErrorResponse = require("../classes/error-response");

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
  const todo = await ToDo.create({
    title: req.headers.title,
    description: req.headers.description,
    isDone: req.headers.isDone,
    isFavourite: req.headers.isFavourite,
    priority: req.headers.priority,
  });

  res.status(200).json(todo);
}

async function patchToDoById(req, res, next) {
  
}

async function deleteAllToDos(req, res, next) {
  ToDo.destroy({
    where: {
      userId: req.userId,
    },
  });
}

async function deleteToDoById(req, res, next) {
  const id = req.params.id;
  ToDo.delete(id, (err) => {
    if (err) return next(err);
    res.send({ message: "Deleted" });
  });
}

initRoutes();

module.exports = router;
