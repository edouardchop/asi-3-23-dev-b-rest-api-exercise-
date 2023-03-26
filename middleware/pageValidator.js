const mw = require("./mw.js")
const User = require("../models/userModel.js")
const Role = require("../models/roleModel.js")


const createOrDelete = mw(async(req, res, next) => {
    const creator = req.body.creator;
    const user = await User.findOne({ firstname: creator });
    if (user) {
        const role = await Role.findOne({ _id: user.role });
        if (role) {
            if (role.name !== "admin" && role.name !== "manager") {
                res.json({ erreur: "vous n'avez pas les droits" });
                return;
            }
            next()
        }
    } else(res.json({ erreur: "cette page n'existe pas" }));
    return;

})

const canRead = mw(async(req, res) => {
    if (req.body.status === "draft") {

        res.json({ erreur: "vous ne pouvez pas lire cette page" })
    } else { res.json(req.body) }
})


module.exports = { createOrDelete, canRead }