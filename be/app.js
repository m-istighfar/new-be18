require("dotenv").config();

const express = require("express");

const cookieParser = require("cookie-parser");

const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const OpenApiValidator = require("express-openapi-validator");

const databaseMiddleware = require("./middleware/databaseMiddleware");
const authMiddleware = require("./middleware/authenticationMiddleware");
const authorizationMiddleware = require("./middleware/authorizationMiddleware");
const errorFormatter = require("./middleware/errorFormatter");
const applyMiddleware = require("./middleware/index");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cookieParser());
applyMiddleware(app);

const openApiPath = "doc/openapi2.yaml";
const file = fs.readFileSync(openApiPath, "utf8");
const swaggerDocument = yaml.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  OpenApiValidator.middleware({
    apiSpec: openApiPath,
    validateRequests: true,
  })
);

app.use(databaseMiddleware);

app.use("/auth", authRoutes);
app.use(
  "/admin",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  adminRoutes
);

app.use("/user", authMiddleware, authorizationMiddleware(["user"]), userRoutes);

app.use(errorFormatter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
