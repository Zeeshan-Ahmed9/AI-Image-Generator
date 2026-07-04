import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ─── Register ───────────────────────────────────────────────────────────────
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return res.json({
            success: true,
            token,
            user: { name: user.name, creditBalance: user.creditBalance },
        });
    } catch (error) {
        console.error("Register error:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

// ─── Login ───────────────────────────────────────────────────────────────────
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return res.json({
            success: true,
            token,
            user: { name: user.name, creditBalance: user.creditBalance },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

// ─── Get User Info ───────────────────────────────────────────────────────────
const getUserInfo = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        return res.json({
            success: true,
            user: { name: user.name, creditBalance: user.creditBalance },
        });
    } catch (error) {
        console.error("Get user info error:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, getUserInfo };