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
        const isProduction = process.env.NODE_ENV === 'production';

        const token = jwt.sign({ userId }, process.env.JWT_SECRET);

        console.log("token generation:", token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: "https://swifttasker-1.onrender.com"
        });

    } catch (error) {
        console.error("Error setting cookie:", error);
    }
};


// maxAge: 30 * 24 * 60 * 60 * 1000,
// path: "/",