const mongoose = require("mongoose");
 
const RecetaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la receta es obligatorio"],
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      enum: ["desayuno", "almuerzo", "cena"],
    },
    descripcion: {
      type: String,
      trim: true,
    },
    tiempoMinutos: {
      type: Number,
      required: [true, "El tiempo de preparación es obligatorio"],
    },
    dificultad: {
      type: String,
      enum: ["fácil", "media", "difícil"],
      default: "fácil",
    },
    ingredientes: [
      {
        nombre: { type: String, required: true },
        cantidad: { type: String },
      },
    ],
    pasos: [
      {
        orden: { type: Number, required: true },
        instruccion: { type: String, required: true },
      },
    ],
    imagen: {
      type: String, 
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);
 
module.exports = mongoose.model("Receta", RecetaSchema);