import express from "express";
import router from "./routes/superheroes.js";
import cors from "cors";

const PORT = 3030;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(process.env.PORT || PORT, () => {
  console.log("Connected to port", PORT);
});
