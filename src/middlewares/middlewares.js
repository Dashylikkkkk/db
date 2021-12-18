const ErrorResponse = require("../classes/error-response");
const contact_person = require("../dataBase/models/contact_person");
const legal_entity = require("../dataBase/models/legal_entity");
const tasks = require("../dataBase/models/tasks");
const Token = require("../dataBase/models/Token");
const workers = require("../dataBase/models/workers");
const contract = require("../dataBase/models/contract")

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
  // const token = req.header("token");

  // if (!token) {
  //   throw new ErrorResponse("token wasn't send", 403);
  // }

  // let tokenFind = await Token.findOne({
  //   where: {
  //     value: token,
  //   },
  // });

  // if (!tokenFind) {
  //   throw new ErrorResponse("invalid token", 403);
  // }

  // req.tokenFind = tokenFind;
  if (!req.header("token"))
    throw new ErrorResponse("Token not found", 400);
  const token = await Token.findOne({
    where: {
      value: req.header("token"),
    },
  });
  if (!token) throw new ErrorResponse("Invalid token", 403);
  req.token = token;
  const worker = await workers.findByPk(token.id_worker);
  req.position = worker.worker_position;
  next();
};

const getAdmin = async (req, res, next) => {
 // console.log("admin\n");
  if (req.position === "Администратор") {
    if (!req.params.id) {
      const task = await tasks.findAll({
        include: [
          {
            model: workers,
            attributes: ["phone_number", "worker_name", "worker_position"],
          },
          {
            model: contract,
          },
          {
            model: contact_person,
            attributes: ["phone_num", "name", "id_org"],
            include: {
              model: legal_entity,
              attributes: ["id", "org_name"],
            },
          },
        ],
      });
      req.task = task;
    } else {
      const task = await tasks.findOne({
        where: {
          id_task: req.params.id,
        },
        include: [
          {
            model: workers,
            attributes: ["phone_number", "worker_name", "worker_position"],
          },
          {
            model: contract,
          },
          {
            model: contact_person,
            attributes: ["phone_num", "name", "id_org"],
            include: {
              model: legal_entity,
              attributes: ["id", "org_name"],
            },
          },
        ],
      });
      req.task = task;
      const worker = await workers.findAll({
        attributes: ["phone_number", "worker_name"],
      });
      req.worker = worker;
    }
  }
  next();
};

const getManager = async (req, res, next) => {
  console.log("manager\n");
  if (req.position === "Менеджер") {
    if (!req.params.id) {
      const task = await tasks.findAll({
        where: {
          [Op.or]: {
            workerId: req.token.id_worker,
            id_manager: req.token.id_worker,
          },
        },
        include: [
          {
            model: workers,
            attributes: ["phone_number", "worker_name", "worker_position"],
          },
          {
            model: contract,
            attributes: ["id_contract", "id_org"],
          },
          // {
          //   model: contact_person,
          //   attributes: ["phone_num", "name", "id_org"],
          //   include: {
          //     model: legal_entity,
          //     attributes: ["id", "org_name"],
          //   },
          // },
        ],
      });
      req.task = task;
    } else {
      const task = await tasks.findOne({
        where: {
          [Op.or]: {
            workerId: req.token.id_worker,
            id_manager: req.token.id_worker,
          },
          id_task: req.params.id,
        },
        include: [
          {
            model: workers,
            attributes: ["phone_number", "worker_name", "worker_position"],
          },
          {
            model: contract,
            attributes: ["id_contract", "id_org"],
          },
          // {
          //   model: contact_person,
          //   attributes: ["phone_num", "name", "id_org"],
          //   include: {
          //     model: legal_entity,
          //     attributes: ["id", "org_name"],
          //   },
          // },
        ],
      });
      req.task = task;
      const worker = await workers.findAll({
        attributes: ["phone_number", "worker_name"],
        where: {
          worker_position: "Младший сотрудник",
        },
      });
      req.worker = worker;
    }
  }
  next();
};

const getWorker = async (req, res, next) => {
  if (req.position === "Младший сотрудник") {
    const task = await tasks.findAll({
      where: {
        workerId: req.token.id_worker,
      },
      include: [
        {
          model: contract,
          attributes: ["id_contract", "id_org"],
        },
        // {
        //   model: contact_person,
        //   attributes: ["phone_num", "name", "id_org"],
        //   include: {
        //     model: legal_entity,
        //     attributes: ["id", "org_name"],
        //   },
        // },
      ],
    });
    req.task = task;
  }
  next();
};

const updateAdmin = async (req, res, next) => {
  if (req.position == "Администратор") {
    req.updateData = req.body;
  }
  next();
};

const updateManager = async (req, res, next) => {
  req.token.id_worker = Number(req.token.id_worker)
  console.log(req.params);
  if (req.position == "Менеджер") {
    const task = await tasks.findOne({
      where: {
        [Op.or]: {
          workerId: req.token.id_worker,
          id_manager: req.token.id_worker,
        },
        id_task: req.params.id,
        isDone: false,
      },
    });
    if (!task) throw new ErrorResponse("Forbidden", 403);
    req.updateData = {
      id_contract: req.body.id_contract,
      workerId: req.body.workerId,
      date_of_creation: req.body.date_of_creation,
      date_of_completion: req.body.date_of_completion,
      task_priority: req.body.task_priority,
      date_of_complition_worker: req.body.date_of_complition_worker,
    };
  }
  next();
};

const updateWorker = async (req, res, next) => {
  if (req.position === "Младший Сотрудник") {
    const task = await tasks.findOne({
      where: {
        workerId: req.token.id_worker,
        id_task: req.params.id,
        date_of_complition_worker: null,
      },
    });
    if (!task) throw new ErrorResponse("Forbidden", 403);
    req.updateData = {  date_of_complition_worker: req.body.date_of_complition_worker };
  }
  next();
};


const checkAdmin = async (req, res, next) => {
  if (req.position != "АДминистратор") throw new ErrorResponse("Forbidden", 403);
  next();
};

const checkCreate = async (req, res, next) => {
  console.log(req.position)
  if (req.position != "Администратор" && req.position != "Менеджер")
    throw new ErrorResponse("Forbidden", 403);
  next();
};

module.exports = {
  asyncHandler,
  syncHandler,
  notFound,
  errorHandler,
  requireToken,
  getAdmin,
  getManager,
  getWorker,
  updateAdmin,
  updateManager,
  updateWorker,
  checkAdmin,
  checkCreate
};
