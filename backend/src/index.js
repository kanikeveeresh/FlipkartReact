const dotenv = require("dotenv");
const router = require("./routes/credentialsRoute.js");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");


dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET"],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB."))
.catch(err => console.error("MongoDB connection error: ", err));


app.use("/api/credentials", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));