const mongoose = require("mongoose");

const ContactoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    correo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    asunto: {
      type: String,
      required: true,
      trim: true,
    },

    mensaje: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacto", ContactoSchema);