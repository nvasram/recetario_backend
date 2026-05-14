const Resena = require("../models/Resena");

// GET /api/resenas
const getResenas = async (req, res, next) => {
  try {
    const resenas = await Resena.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: resenas.length,
      data: resenas,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/resenas/:id
const getResenaById = async (req, res, next) => {
  try {
    const resena = await Resena.findById(req.params.id);

    if (!resena) {
      return res.status(404).json({
        success: false,
        error: "Reseña no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      data: resena,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/resenas
const createResena = async (req, res, next) => {
  try {
    const { nombre, receta, calificacion, comentario } = req.body;

    if (!nombre || !receta || !calificacion || !comentario) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son obligatorios",
      });
    }

    const nuevaResena = await Resena.create({
      nombre,
      receta,
      calificacion,
      comentario,
    });

    res.status(201).json({
      success: true,
      message: "Reseña enviada correctamente",
      data: nuevaResena,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/resenas/:id
const updateResena = async (req, res, next) => {
  try {
    const resena = await Resena.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!resena) {
      return res.status(404).json({
        success: false,
        error: "Reseña no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reseña actualizada correctamente",
      data: resena,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/resenas/:id
const deleteResena = async (req, res, next) => {
  try {
    const resena = await Resena.findByIdAndDelete(req.params.id);

    if (!resena) {
      return res.status(404).json({
        success: false,
        error: "Reseña no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reseña eliminada correctamente",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResenas,
  getResenaById,
  createResena,
  updateResena,
  deleteResena,
};