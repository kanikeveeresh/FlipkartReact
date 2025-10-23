const dotenv = require("dotenv");
const router = require("./routes/credentialsRoute.js");
const route = require("./routes/CartItemsRouter.js");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const addressRouter = require("./routes/AddressRouter.js");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["POST", "GET", "DELETE", "PUT"]
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})
.then(() => console.log("Connected to MongoDB."))
.catch(err => console.error("MongoDB connection error: ", err));


app.use("/api/credentials", router);
app.use("/", route);
app.use("/api", addressRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
