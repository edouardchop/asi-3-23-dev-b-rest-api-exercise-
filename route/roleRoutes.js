const express = require("express")
const router = express.Router()
const { createRole, updateRole, deleteRole, readRole } = require("../controllers/roleController.js")

router.post("/createRole", createRole)
router.post("/update", updateRole)
router.post("/delete", deleteRole)
router.get("/read", readRole)

module.exports = router