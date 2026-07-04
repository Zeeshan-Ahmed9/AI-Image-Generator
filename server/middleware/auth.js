import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized — please login again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!req.body) {
            req.body = {};
        }
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid or expired token — please login again" });
    }
};

export default userAuth;
