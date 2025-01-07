const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists, you can login.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Signup successful!",
            success: true,
        });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ where: { email } });
        const errormsg = 'Auth failed email or password is wrong';
        if (!existingUser) {
            return res.status(403).json({
                message: errormsg,
                success: false,
            });
        }
        const isPassEqual = await bcrypt.compare(password, existingUser.password);
        if (!isPassEqual) {
            return res.status(403)
                        .json({
                            message: errormsg, success: false
                        });
        }
        const jwtToken = jwt.sign(
            {email: existingUser.email, id: existingUser.id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({
            message: "Login successful!",
            success: true,
            jwtToken,
            email,
            name: existingUser.name
        });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


module.exports = {
    signup, login
};



