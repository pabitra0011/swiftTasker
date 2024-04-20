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
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    // { expiresIn: "1d" }
    console.log(token)
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // prevent CSRF attacks
    });
}
