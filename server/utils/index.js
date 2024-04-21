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
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
        console.log("Token:", token);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
        });

    } catch (error) {
        console.error("Error setting cookie:", error);
    }
};
