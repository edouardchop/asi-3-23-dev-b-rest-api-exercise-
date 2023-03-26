const express = require("express")
const router = express.Router()
const { getNav, createNav } = require("../controllers/navigationController.js")
router.get("/getnavigation", getNav)
router.post("/create", createNav)
module.exports = router