const express = require("express");
const router = express.Router();
const {
  getContactos,
  getContactoById,
  createContacto,
  updateContacto,
  deleteContacto,
} = require("../controllers/contactoController");

router.get("/", getContactos);
router.post("/", createContacto);

router.get("/:id", getContactoById);
router.put("/:id", updateContacto);
router.delete("/:id", deleteContacto);

module.exports = router;