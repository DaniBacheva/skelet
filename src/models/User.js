const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minLength: [3, "First name must be at least 3 characters"] },
    lastName: { type: String, required: true, minLength: [3, "Last name must be at least 2 characters"] },
    email: { type: String, required: true, unique: true , minLength: [10, "Email must be at least 10 characters"]},
    password: { type: String, required: true , minLength: [4, "Password must be at least 4 characters"]},
});


userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error("Passwords mismatch")
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})
const User = mongoose.model("User", userSchema);

module.exports = User;




