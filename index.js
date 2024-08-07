import express from "express";
import bodyParser from "body-parser";
import * as dotevn from "dotenv";
dotevn.config();

// Controllers
import { createPrediction } from "./controllers/flowise.js";
import { deleteConversation } from "./controllers/deleteConversation.js"; // Importiere den neuen Controller
import { getConversation } from "./controllers/getConversation.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/flowise", createPrediction);
app.post("/api/delete-conversation", deleteConversation);
app.post("/api/get-conversation", getConversation);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
