import bycrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
},
    { timestamps: true }
);

// before we save the user information or before we create any new user we will perform this action 
userSchema.pre("save", async function (next) {
    // we first check if this is update this the user that we want to create if it modified 
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);

});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;


// 1. timestamps: true,,, => so that we don't have to create date and update date , it will added automatically

// Pre - Save Middleware: The pre("save") middleware function is executed before saving a user document to the database.It checks if the password field has been modified(indicating a new password or modified password).If the password is modified, it generates a salt using bcrypt and hashes the password before saving it to the database.

