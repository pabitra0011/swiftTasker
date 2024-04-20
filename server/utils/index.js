import mongoose from "mongoose"
import jwt from "jsonwebtoken"

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("DB Connect Established");
    } catch (err) {
        console.log("DB error" + err)
    }

}


export const createJWT = async (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
    // { expiresIn: "1d" }
    res.cookie("token", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none", // prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1day
    });
}
