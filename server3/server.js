const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors= require('cors')
// const dotenv = require("dotenv");

// dotenv.config();
// connect to db
mongoose.connect(
'mongodb://localhost:27017/server3',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
() => console.log("connected to db")
);
// import routes
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const dashboardRoutes = require("./routes/dashboard");
const fileRoutes = require("./routes/file.routes");
const verifyToken = require("./routes/validateToken");
// route middlewares
app.use(cors());
app.use(express.json()); // for body parser
app.use("/api/user", registerRoutes);
app.use("/api/user", loginRoutes);
app.use("/api/file", fileRoutes);
// this route is protected with token
app.use("/api/dashboard", verifyToken, dashboardRoutes);

app.listen(3001, () => console.log("server is running..."));
