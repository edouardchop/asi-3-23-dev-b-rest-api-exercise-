const express = require("express")
const router = express.Router()
const { createPage, getAllPages, getPage, deletePage, updatePage } = require("../controllers/pageController.js")
const { createOrDelete, canRead } = require("../middleware/pageValidator.js")


router.post("/newpage", createOrDelete, createPage)
router.get("/getallpages", canRead, getAllPages)
router.get("/getpage", canRead, getPage)
router.post("/delete", createOrDelete, deletePage)
router.post("/update", canRead, updatePage)


module.exports = router