const express = require("express")
const router = express.Router()
const { createField, getField, deleteField, updateField } = require("../controllers/fieldController.js")
router.post("/createfield", createField)
router.post("/delete", deleteField)
router.post("/update", updateField)
router.get("/read", getField)
module.exports = router