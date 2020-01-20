const express = require("express")
const path = require("path")

const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "dist/index.html"))
})

app.listen(port, () => console.log(`Using port ${port}`))
