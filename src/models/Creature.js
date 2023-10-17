const mongoose = require('mongoose');


const creatureSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], minLength: 2, },
    species: { type: String, required: [true, "Species is required"], minLength: 3, },
    skinColor: { type: String, required: [true, "Skin color is required"], minLength: 3 },
    eyeColor: { type: String, required: [true, "Eye color is required"], minLength: 3 },
    image: { type: String, required: [true, "Image is required"] },
    description: { type: String, required: [true, "Description is required"], minLength: 5, maxLength: 500 },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    votes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
    ]
})
const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;