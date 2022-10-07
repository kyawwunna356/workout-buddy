const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users");
const cors = require("cors");

require("dotenv").config();

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};


// -----------------------------------------
// express app
const app = express();

//middlewares
app.use(express.json());
app.use(cors(corsOptions));

//connect to database and start the app
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("listening on port " + process.env.PORT)
    );
  })
  .catch((err) => {
    console.log(err);
  });

//workout Routes
app.use("/api/workouts", workoutRoutes);

//user Routes
app.use("/api/users", userRoutes )
