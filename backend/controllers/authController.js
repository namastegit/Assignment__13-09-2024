 const User = require("../models/User");

exports.Register = async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = new User({username, password});
        await user.save();
        res.status(200).json({
            message: "User Registered Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error Registering user", error: error.message
        })
    }
}

exports.Login = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if( !user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        } 
        const token = user.generateAuthToken();
        res.json({message: "Token is : " , token});
    } catch (error) {
        res.status(500).json({
            message: "Error Logging In", error: error.message
        })
    }
}