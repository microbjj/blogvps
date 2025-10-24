require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const routes = require("./routes")

const app = express()

app.use(express.static('../practice_blog/dist'))

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/api", routes)

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`)
    })
})
