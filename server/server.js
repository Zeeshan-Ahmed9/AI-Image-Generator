import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

dotenv.config();

const app = express();
await connectDB();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
    res.send("Api working");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});