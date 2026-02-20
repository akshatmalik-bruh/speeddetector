const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connection } = require("./database/db");
const speedRoute = require("./routes/speedRoutes");

dotenv.config();


app.use(express.json()); 


connection();


app.use("/api/v1", speedRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});