const express = require("express");
const mongoose = require("mongoose");

const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
const offre = require("./routes/api/offre");
const config = require("config");
const cors = require("cors")


const app = express();

app.use(express.json());
app.use(cors());

const mongo_url = config.get("mongo_url");

mongoose
  .connect(mongo_url, { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/offre", offre);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
