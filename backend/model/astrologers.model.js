const mongoose = require("mongoose")

const astroSchema = mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    language: { type: [String], required: true },
    specialties: { type: [String], required: true },
    profileImageUrl: { type: String, required: true },
}, {
    versionKey: false
})

const astroModel = mongoose.model("astro", astroSchema)

module.exports = {
    astroModel
}
