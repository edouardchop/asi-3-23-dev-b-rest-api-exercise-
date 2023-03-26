const page = require('../models/pageModel.js')
const validatePage = require('../middleware/pageValidator.js');

const createPage = async(req, res) => {
    const { userWhoModified, status, creator, urlslag, content, title } = req.body

    if (!status || !creator || !urlslag || !title) {
        res.json({ erreur: "veuillez remplir tout les champs" })
    } else {
        const pageExist = await page.findOne({ title, content, creator, status, urlslag })
        if (pageExist) {
            res.json({ erreur: "cette page existe déjà " })
        } else {

            const newPage = await page.create({
                userWhoModified,
                status,
                creator,
                urlslag,
                content,
                title
            })
            res.json({ message: "page créé" })
        }
    }

}









const getAllPages = async(req, res) => {
    const pages = await page.find()
    res.json(pages)


}
const getPage = async(req, res) => {
    const { title, creator } = req.body
    const pageToRead = await page.findOne({ title, creator })
    res.json(pageToRead)


}







const deletePage = async(req, res) => {

    const { title, content, creator } = req.body
    try {

        const pageToDelete = await page.findOneAndDelete({ title, content, creator })
        res.json({ message: "Page supprimée avec succès" })
    } catch (err) {
        res.status(500).json({ erreur: "Erreur lors de la suppression de la page" })
    }
}

const updatePage = async(req, res) => {
    const { title, content, urlslag, creator, userWhoModified, status } = req.body
    const pageToUpdate = await page.findOne({ email })
    if (!pageToUpdate) { return res.json({ erreur: "la page n'existe pas" }) }
    pageToUpdate.title = title || pageToUpdate.title,
        pageToUpdate.content = content || pageToUpdate.content,
        pageToUpdate.urlslag = urlslag || pageToUpdate.urlslag,
        pageToUpdate.creator = creator || pageToUpdate.creator,
        pageToUpdate.userWhoModified = userWhoModified || pageToUpdate.userWhoModified,
        pageToUpdate.status = status || pageToUpdate.status
    const updatedPage = await pageToUpdate.save();

    res.send(updatedPage);

}

module.exports = { createPage, getAllPages, getPage, deletePage, updatePage }