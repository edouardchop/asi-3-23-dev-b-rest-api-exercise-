const field = require('../models/fieldModel.js')

const getField = async(req, res) => {
    const { type, label } = req.body
    const fieldToRead = await field.findOne({ type, label })
    res.json(fieldToRead)


}

const createField = async(req, res) => {
    const { type, options, label, defaultValue } = req.body

    if (!label || !type) {
        res.json({ erreur: "veuillez remplir tout les champs" })
    } else {
        const fieldExist = await field.findOne({ type, label, options, defaultValue })
        if (fieldExist) {
            res.json({ erreur: "ce champs existe déjà " })
        } else {

            const newField = await field.create({
                type,
                label,
                options,
                defaultValue
            })
            res.json({ message: "champs créé" })
        }
    }

}

const deleteField = async(req, res) => {

    const id = req.body._id
    try {

        const fieldToDelete = await field.findOneAndDelete({ id })
        res.json({ message: "Champs supprimé avec succès" })
    } catch (err) {
        res.status(500).json({ erreur: "Erreur lors de la suppression du champs" })
    }
}

const updateField = async(req, res) => {
    const { type, options, label, defaultValue } = req.body
    id = req.body._id

    const fieldToUpdate = await field.findOne({ id })
    if (!fieldToUpdate) { return res.json({ erreur: "le champs n'existe pas" }) }
    fieldToUpdate.type = type || fieldToUpdate.type,
        fieldToUpdate.options = options || fieldToUpdate.options,
        fieldToUpdate.label = label || fieldToUpdate.label,
        fieldToUpdate.defaultValue = defaultValue || fieldToUpdate.defaultValue

    const updatedField = await fieldToUpdate.save();

    res.send(updatedField);


}




module.exports = { createField, getField, deleteField, updateField }