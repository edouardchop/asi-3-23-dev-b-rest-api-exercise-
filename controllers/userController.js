const User = require("../models/userModel.js")
const Role = require("../models/roleModel.js")
const bcrypt = require("bcryptjs")

const generateToken = require("../utils/token")

const registerUser = async(req, res) => {
    const { email, password, firstname, lastname, role } = req.body
    if (!email || !password || !firstname || !lastname || !role) {
        res.json({ erreur: "veuillez remplir tout les champs" })
    } else {
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.json({ erreur: "cet email est déjà utilisé " })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            firstname,
            email,
            lastname,
            password: hashedPassword,
            role
        })
        if (user) {
            res.json({ message: "utilisateur bien créé" })
        }
    }

}

const loggin = async(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.json({ erreur: "veuillez renseigner tout les champs" })
    } else {
        const userExist = await User.findOne({ email })
        if (!userExist) {
            res.json({ erreur: "identifiant ou mot de passe incorrect" })

        }
        const isMatch = await bcrypt.compare(password, userExist.password)
        if (isMatch) {
            res.json({
                token: generateToken(userExist._id)
            })

        } else {
            res.json({ message: "identifiant ou mot de passe incorrect" })
        }
    }
}


const getAllUsers = async(req, res) => {
    const users = await User.find()
    res.json(users)


}

const deleteUser = async(req, res) => {

    const { email, firstname, lastname } = req.body
    try {

        const user = await User.findOneAndDelete({ email, firstname, lastname });
        if (!user) {
            return res.json({ erreur: "Utilisateur introuvable" });
        }
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ erreur: "Erreur lors de la suppression de l'utilisateur" });
    }
}

const updateUser = async(req, res) => {
    const { email, password, firstname, lastname, role } = req.body
    const user = await User.findOne({ email })
    if (!user) { return res.json({ erreur: "l'utilisateur n'existe pas" }) }
    user.email = email || user.email,
        user.password = password || user.password,
        user.firstname = firstname || user.firstname,
        user.lastname = lastname || user.lastname,
        user.role = role || user.role
    const updatedUser = await user.save();

    res.send(updatedUser);

}


const readUser = async(req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email })
    res.json(user)
}

module.exports = { registerUser, loggin, getAllUsers, deleteUser, updateUser, readUser };