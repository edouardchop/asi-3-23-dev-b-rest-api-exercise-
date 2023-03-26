const nav = require('../models/navigationmenuModel.js')
const Page = require('../models/pageModel.js');
const getAllPages = ('../controllers/pageController.js')


const getNav = async(req, res) => {
    const Name = req.body.Name
    const NavToRead = await nav.findOne({ Name })
    res.json(NavToRead)


}

const createNav = async(req, res) => {
    const { Name, listOfPages } = req.body
    const listPages = getAllPages


    if (!Name) {
        res.json({ erreur: "veuillez remplir tout les champs" })
    } else {
        const navExist = await nav.findOne({ Name })
        if (navExist) {
            res.json({ erreur: "cette navigation existe déjà " })
        } else {

            const newNav = await nav.create({
                Name,
                listOfPages
            })
            res.json({ message: "page créé" })
        }
    }
}

module.exports = { getNav, createNav }