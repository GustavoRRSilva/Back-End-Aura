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

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexão com MongoDB estabelecida.");

    // Escuta na porta padrão da Vercel
    app.listen(process.env.PORT || 3000, () => {
      console.log("Servidor rodando...");
    });
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB:", error);
    process.exit(1); // Encerra o processo se a conexão falhar
  }
};

startServer();
