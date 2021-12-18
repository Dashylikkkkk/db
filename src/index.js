const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const { func } = require("./dataBase");
const { contact_person } = require("./dataBase/models/contact_person");
const { contract } = require("./dataBase/models/contract");
const { equipment } = require("./dataBase/models/equipment");
const { legal_entity } = require("./dataBase/models/legal_entity");
const { tasks } = require("./dataBase/models/tasks");
const { workers } = require("./dataBase/models/workers");
const apiTasksRouter = require("./controllers/api-tasks.controller");
const apiAuthRouter = require("./controllers/api-auth.controller");
const apiUsersRouter = require("./controllers/api-workers.controller");
const { notFound, errorHandler } = require("./middlewares/middlewares");

func();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("URL = ", req.url);
  console.log("Original_URL = ", req.originalUrl);
  console.log("METHOD = ", req.method);
  console.log("HOST = ", req.headers.host);
  console.log("IsSecure = ", req.secure);
  console.log("BODY", req.body);
  console.log("QUERY", req.query);

  next();
});

app.use("/api/tasks", apiTasksRouter);
app.use("/api/auth", apiAuthRouter);
app.use("/api/users", apiUsersRouter);

app.use(notFound);
app.use(errorHandler);

http.createServer(app).listen(3001, () => {
  console.log("Server is working on port 3001");
});
