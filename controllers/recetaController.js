const mongoose = require("mongoose");
const Receta = require("../models/Receta");

// GET /api/recetas
const getRecetas = async (req, res, next) => {
  try {
    const filtro = {};

    if (req.query.categoria) {
      filtro.categoria = req.query.categoria;
    }

    const recetas = await Receta.find(filtro).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: recetas.length,
      data: recetas,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/recetas/:id
const getRecetaById = async (req, res, next) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "ID no válido",
      });
    }

    const receta = await Receta.findById(id);

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: "Receta no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      data: receta,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/recetas
const createReceta = async (req, res, next) => {
  try {
    const receta = await Receta.create(req.body);

    res.status(201).json({
      success: true,
      message: "Receta creada correctamente",
      data: receta,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/recetas/:id
const updateReceta = async (req, res, next) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "ID no válido",
      });
    }

    const receta = await Receta.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: "Receta no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Receta actualizada correctamente",
      data: receta,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/recetas/:id
const deleteReceta = async (req, res, next) => {
  try {
    const id = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "ID no válido",
      });
    }

    const receta = await Receta.findByIdAndDelete(id);

    if (!receta) {
      return res.status(404).json({
        success: false,
        error: "Receta no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Receta eliminada correctamente",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta,
};