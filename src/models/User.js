const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema ({
    firstName:{ type:String, required: true},
    lastName:{ type:String, required: true},
    email:{ type:String, required: true, unique:true},
    password:{ type:String, required: true},
});

userSchema.virtual('repeatPasswor')
.set(function(value) {
    if(value !== this.password) {
        throw new mongoose.MongooseError("Passwords mismatch")
    }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
        


