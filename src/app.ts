import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

export default app;
