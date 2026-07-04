import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        if (!userId || !prompt) {
            return res.json({ success: false, message: "Missing details" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: "No credit left", creditBalance: user.creditBalance });
        }

        // Call Clipdrop API
        const formData = new FormData();
        formData.append("prompt", prompt);

        const response = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                "x-api-key": process.env.CLIPDROP_API,
                ...formData.getHeaders(),
            },
            responseType: "arraybuffer",
        });

        // Convert image binary to base64
        const base64Image = Buffer.from(response.data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Deduct 1 credit
        user.creditBalance -= 1;
        await user.save();

        return res.json({
            success: true,
            message: "Image generated successfully",
            creditBalance: user.creditBalance,
            resultImage,
        });

    } catch (error) {
        console.error("Image generation error:", error.message);
        return res.json({ success: false, message: error.message });
    }
};

export { generateImage };
