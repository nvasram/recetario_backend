const express = require("express");
const router = express.Router();

const {
  getRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta,
} = require("../controllers/recetaController");

router.get("/", getRecetas);
router.post("/", createReceta);

router.get("/:id", getRecetaById);
router.put("/:id", updateReceta);
router.delete("/:id", deleteReceta);

module.exports = router;