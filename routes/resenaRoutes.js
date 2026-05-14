const express = require("express");
const router = express.Router();
const {
  getResenas,
  getResenaById,
  createResena,
  updateResena,
  deleteResena,
} = require("../controllers/resenaController");
 
router.get("/", getResenas);
router.post("/", createResena);

router.get("/:id", getResenaById);
router.put("/:id", updateResena);
router.delete("/:id", deleteResena);
 
module.exports = router;
 