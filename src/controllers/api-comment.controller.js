const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Comment = require("../dataBase/models/Comment.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.post("/", asyncHandler(requireToken), asyncHandler(createComment));
  // router.patch("/", asyncHandler(requireToken), asyncHandler(patchComment));
  router.delete(
    "/:id",
    asyncHandler(requireToken),
    asyncHandler(deleteComment)
  );
}

async function createComment(req, res, _next) {
  const todoId = req.todoId;
  const comment = await Comment.create({ ...req.body, todoId });

  res.status(200).json(comment);
}

// async function patchComment(req, res, _next) {
//   await Comment.update(
//     { ...req.body },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   );
//   res.status(200).json({ message: "Updated" });
// }

async function deleteComment(req, res, _next) {
  let id = req.params.id;
  let comment = await Comment.findByPk(id);
  if (!comment) {
    throw new ErrorResponse("No todo found", 404);
  }

  await comment.destroy();

  res.status(200).json({ message: "Deteled" });
}

initRoutes();

module.exports = router;
