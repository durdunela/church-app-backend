import express from "express";
import cors from "cors";
import db from "./config/db.js";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import showRoutes from "./routes/show.js";
const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/show", showRoutes);

config();
db()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    } catch (e) {
      console.log("Can not connect yo server", e);
    }
  })
  .catch((e) => {
    console.log("invalid database connection", e);
  });
