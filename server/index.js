import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRouter);

// const CONNECTION_URL = ""; // using environemnt varible to store database connection string
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
	.catch((error) => console.log(`Server did not connect: ${error}`));

mongoose.set("useFindAndModify", false);