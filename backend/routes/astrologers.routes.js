const express = require("express")
const { handleCreateAstro, handleGetAstro, handleUpadteAstro } = require("../controller/astrologers.controller")




const AstroRouter = express.Router()


AstroRouter.post("/register", handleCreateAstro)
AstroRouter.get("/astrologers", handleGetAstro)
AstroRouter.patch("/astrologers/:astroId", handleUpadteAstro)
// AstroRouter.patch("/delete/:id", handleDeleteAstro)


module.exports = {
    AstroRouter
}