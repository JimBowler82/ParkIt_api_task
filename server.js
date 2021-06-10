const express = require("express");
const cors = require("cors");
const app = express();

// Require Routers
const userRouter = require("./routes/users");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);

// 404
app.use(function (req, res) {
  res.status(404).json({
    success: false,
    payload: "404 Not Found",
  });
});

// Server listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));
