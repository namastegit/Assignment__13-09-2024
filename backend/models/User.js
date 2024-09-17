const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema( {
username: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
}
}, {timestamps: true});

UserSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password,10);
    }next();
});

UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id  }, process.env.JWT_SECRET,{ expiresIn: "10h" });
}

UserSchema.methods.comparePassword = async function (password) {
    return bcryptjs.compare( password, this.password);
}

module.exports = mongoose.model("User", UserSchema);