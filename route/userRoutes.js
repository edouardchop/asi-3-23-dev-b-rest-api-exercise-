const express = require("express")
const router = express.Router()
const { registerUser, loggin, getAllUsers, deleteUser, updateUser, readUser } = require("../controllers/userController.js")
const { createOrDeleteOrUpdate, canRead } = require("../middleware/userValidator.js")


router.post("/register", createOrDeleteOrUpdate, registerUser)

router.post("/loggin", loggin)


router.get("/allusers", getAllUsers)
router.get("/readuser", readUser)

router.post("/delete", createOrDeleteOrUpdate, deleteUser)
router.post("/update", createOrDeleteOrUpdate, updateUser)

module.exports = router