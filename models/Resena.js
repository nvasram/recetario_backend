const mongoose = require("mongoose");

const ResenaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del autor es obligatorio"],
      trim: true,
    },

    receta: {
      type: String,
      required: [true, "La receta es obligatoria"],
      trim: true,
    },

    calificacion: {
      type: Number,
      required: [true, "La calificación es obligatoria"],
      min: [1, "La calificación mínima es 1"],
      max: [5, "La calificación máxima es 5"],
    },

    comentario: {
      type: String,
      required: [true, "El comentario es obligatorio"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resena", ResenaSchema);