const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const { registerSchema, loginSchema } = require("../validation/authValidation");

exports.register = async (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password } = req.body;

    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.createUser(name, email, hashedPassword);

    res.json({
        message: "User registered",
        user
    });
};


exports.login = async (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);

    if (!user) {
        return res.status(400).json({ message: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });

};