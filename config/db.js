const mongoose = require("mongoose")
    // 
const connectDb = async() => {
    try {
        const connexion = await mongoose.connect(process.env.MONGOURL)
        console.log("mongoDb connecté")

    } catch (err) {
        console.log(err)
        process.exit(1)

    }
}

module.exports = connectDb