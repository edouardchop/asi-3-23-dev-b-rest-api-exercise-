const express = require("express")
const dotenv = require("dotenv").config()
const app = express();
const connectDb = require("./config/db.js")
    // dans ce projet la on parle json
app.use(express.json())
connectDb()
    //POUR chaque route qui va dans/api/users va directement puiser dans userRoutes.js
app.use("/api/users", require("./route/userRoutes.js"))
app.use("/api/roles", require("./route/roleRoutes.js"))
app.use("/api/pages", require("./route/pageRoutes.js"))
app.use("/api/fields", require("./route/fieldRoutes.js"))
app.use("/api/navigation", require("./route/navigationRoutes.js"))

app.listen(process.env.PORT, () => console.log("application connectée au port "));