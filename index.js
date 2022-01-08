//main imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//route imports
const jobRouter = require("./routes/job");
const authRouter = require("./routes/auth");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use(authRouter);
app.use("/api/jobs", jobRouter);

//connection to DB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
