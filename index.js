const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorMiddleware");

const recetaRoutes = require("./routes/recetasRoutes");
const resenaRoutes = require("./routes/resenaRoutes");
const contactoRoutes = require("./routes/contactoRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Recetario funcionando correctamente",
    endpoints: {
      recetas: "/api/recetas",
      resenas: "/api/resenas",
      contactos: "/api/contactos",
    },
  });
});

app.use("/api/recetas", recetaRoutes);
app.use("/api/resenas", resenaRoutes);
app.use("/api/contactos", contactoRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});