import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Usando as rotas definidas
app.use("/", leadRoutes);

(async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      mongoose.Promise = global.Promise;
      await mongoose.connect(MONGO_URI);
      console.log("Conexão com MongoDB estabelecida.");
    }
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB:", error);
  }
})();

export default app; // Exporta o app em vez de ouvir diretamente uma porta
