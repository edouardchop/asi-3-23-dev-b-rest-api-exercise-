const Role = require("../models/roleModel.js")


const createRole = async(req, res) => {
    const { name, permission } = req.body
    if (!name || !permission) {
        res.json({ erreur: "veuillez remplir tout les champs" })
    } else {
        const roleExist = await Role.findOne({ name, permission })
        if (roleExist) {
            res.json({ erreur: "ce role existe déjà" })
        } else {
            const role = await Role.create({
                name,
                permission
            })
            if (role) {
                res.json({ message: "role bien créé" })
            }
        }
    }

}



const readRole = async(req, res) => {
    const id = req.body._id
    const role = await Role.findOne({ id })
    res.json(role)
}
const updateRole = async(req, res) => {
    const { name, permission } = req.body
    const id = req.body._id
    const role = await Role.findOne({ id })
    if (!role) { return res.json({ erreur: "l'utilisateur n'existe pas" }) }

    role.name = name || role.name,
        role.permission = permission || role.permission

    const updatedRole = await role.save();

    res.send(updatedRole);

}



const deleteRole = async(req, res) => {

    const { name, permission } = req.body
    try {

        const role = await Role.findOneAndDelete({ name, permission });
        if (!role) {
            return res.json({ erreur: "Role introuvable" });
        }
        res.json({ message: "Role supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ erreur: "Erreur lors de la suppression du role" });
    }
}

module.exports = { createRole, readRole, updateRole, deleteRole }