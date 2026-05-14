const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
 
  // Error de validación de Mongoose
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: "Error de validación",
      details: messages,
    });
  }
 
  // ID de MongoDB no válido
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: "ID no válido",
    });
  }
 
  // Error de clave duplicada (unique)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: "Ya existe un registro con ese valor",
    });
  }
 
  // Error genérico
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Error interno del servidor",
  });
};
 
module.exports = errorHandler;
 