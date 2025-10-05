import { users } from "../utils/mockUsers.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ messsage: "No Token Provided" });
    }

    const token = authHeader.split(" ")[1];

    const user = users.find(u => u.token === token);
    if (!user) {
        return res.status(401).json({ messsage: 'Invalid token' });
    }

    req.user = user;
    next();
}