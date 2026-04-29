import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verify = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("Token Required");
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    const user = await User.findById(decoded.user_id);
    if (!user) {
        return res.status(401).json({ error: "USER_NOT_FOUND" });
    }

    req.user = decoded;
    return next();
};

export default verify;
