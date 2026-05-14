const Contacto = require("../models/Contacto");

// Obtener todos los contactos
const getContactos = async (req, res, next) => {
  try {
    const contactos = await Contacto.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: contactos.length,
      data: contactos,
    });
  } catch (error) {
    next(error);
  }
};

// Obtener contacto por ID
const getContactoById = async (req, res, next) => {
  try {
    const contacto = await Contacto.findById(req.params.id);

    if (!contacto) {
      return res.status(404).json({
        success: false,
        error: "Contacto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: contacto,
    });
  } catch (error) {
    next(error);
  }
};

// Crear contacto
const createContacto = async (req, res, next) => {
  try {
    const { nombre, correo, asunto, mensaje } = req.body;

    if (!nombre || !correo || !asunto || !mensaje) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son obligatorios",
      });
    }

    const contacto = await Contacto.create({
      nombre,
      correo,
      asunto,
      mensaje,
    });

    res.status(201).json({
      success: true,
      message: "Mensaje enviado correctamente",
      data: contacto,
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar contacto
const updateContacto = async (req, res, next) => {
  try {
    const contacto = await Contacto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contacto) {
      return res.status(404).json({
        success: false,
        error: "Contacto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: contacto,
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar contacto
const deleteContacto = async (req, res, next) => {
  try {
    const contacto = await Contacto.findByIdAndDelete(req.params.id);

    if (!contacto) {
      return res.status(404).json({
        success: false,
        error: "Contacto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contacto eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactos,
  getContactoById,
  createContacto,
  updateContacto,
  deleteContacto,
};