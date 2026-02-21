const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connection } = require("./database/db");
const speedRoute = require("./routes/speedRoutes");
const cors = require("cors");

dotenv.config();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://speeddetector-iota.vercel.app"
    ],
    credentials: true
  })
);


app.use(express.json()); 


connection();


app.use("/api/v1", speedRoute);


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});