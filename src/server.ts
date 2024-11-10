import app from "./app";
import connectToMongo from "./config/database/mongo";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 80;

connectToMongo();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
