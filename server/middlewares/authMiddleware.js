import jwt from "jsonwebtoken"
import User from '../models/user.js'


const protectRoute = async (req, res, next) => {
    try {
        console.log("Request Headers:", req.headers);
        console.log("Request Cookies:", req.cookies);

        let token = req.cookies?.token;
        console.log("auth middleware token ==", token)

        if (token) {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

            const respon = await User.findById(decodeToken.userId).select("isAdmin email");

            req.user = {
                email: respon.email,
                isAdmin: respon.isAdmin,
                userId: decodeToken.userId
            }

            next()
        } else {
            return res.status(401).json({ status: false, message: "Not authorized. try login again!!!!" })
        }
    } catch (err) {
        console.log(err)
    }
};


const isAdminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {

        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "Not authorized as admin. Try login as admin...",
        });
    }
};

export { isAdminRoute, protectRoute }