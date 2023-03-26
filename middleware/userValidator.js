const mw = require("./mw.js")
const User = require("../models/userModel.js")
const Role = require("../models/roleModel.js")


const createOrDeleteOrUpdate = mw(async(req, res, next) => {

    const user = req.body
    const role = await Role.findOne({ _id: user.role });
    if (role) {
        if (role.name !== "admin") {
            res.json({ erreur: "vous n'avez pas les droits" });
            return;
        }
        next()
    } else(res.json({ erreur: "cette utilisateur n'existe pas" }));
    return;

})

const canRead = mw(async(req, res) => {
    const user = req.body
    const role = await Role.findOne({ _id: user.role });
    if (role.name === "admin") {

        res.json({ erreur: "vous ne pouvez pas regarder ce profil" })
    } else { res.json(req.body) }
})


module.exports = { createOrDeleteOrUpdate, canRead }