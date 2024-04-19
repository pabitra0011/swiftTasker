import User from "../models/user.js";
import { createJWT } from "../utils/index.js";
import Notification from "../models/notification.js";

// for user reg.............
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin, role, title } = req.body;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({
                status: false,
                message: "User already exists hehe",
            });
        }

        //if user not exist in databse we should creat new one
        const user = await User.create({
            name, email, password, isAdmin, role, title,
        });

        if (user) {
            isAdmin ? createJWT(res, user._id) : null

            user.password = undefined;  //we don't have to send the user password to the front end
            res.status(201).json(user)

        } else {
            return res
                .status(400)
                .json({ status: false, message: "Invalid user data" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


// for user login ...............
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(401)
                .json({ status: false, message: "User Not Exist with this emil id." });
        }

        if (!user?.isActive) {
            return res.status(401).json({
                status: false,
                message: "User account has been deactivated, contact the administrator",
            })
        }

        const isPassMatch = await user.matchPassword(password);

        if (user && isPassMatch) {
            createJWT(res, user._id);

            user.password = undefined;
            res.status(200).json(user);

        } else {
            return res
                .status(401)
                .json({ status: false, message: "Invalid email or password" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


// logout controller .................
export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            htttpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


// get all users or team list .............
export const getTeamList = async (req, res) => {
    try {
        const users = await User.find().select("name title role email isActive");

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


// get all Notifications .....................
export const getNotificationsList = async (req, res) => {
    try {
        // const userId = req.user;
        const userId = req.user.userId; // Correct way to access userId

        // console.log(userId.userId)
        const notifications = await Notification.find({
            team: userId,
            isRead: { $nin: [userId] },
        }).populate("task", "title");

        res.status(201).json(notifications);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};



export const markNotificationRead = async (req, res) => {
    try {
        const { userId } = req.user;

        const { isReadType, id } = req.query;

        if (isReadType === "all") {// when user clik mark as all read button in front end.
            await Notification.updateMany(
                { team: userId, isRead: { $nin: [userId] } },
                { $push: { isRead: userId } },
                { new: true }
            );
        } else {
            await Notification.findOneAndUpdate(
                { _id: id, isRead: { $nin: [userId] } },
                { $push: { isRead: userId } },
                { new: true }
            );
        }

        res.status(201).json({ status: true, message: "Done" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};



export const updateUserProfile = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user;
        const { _id } = req.body;

        const id =
            isAdmin && userId === _id
                ? userId
                : isAdmin && userId !== _id
                    ? _id
                    : userId;

        const user = await User.findById(id);

        if (user) {
            user.name = req.body.name || user.name;
            user.title = req.body.title || user.title;
            user.role = req.body.role || user.role;

            const updateUser = await user.save();

            user.password = undefined;

            res.status(201).json({
                status: true,
                message: "Profile Updated Successfully.",
                user: updateUser,
            })
        } else {
            res.status(404).json({ status: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


export const changeUserPassword = async (req, res) => {
    try {
        const { userId } = req.user

        const user = await User.findById(userId)

        if (user) {
            user.password = req.body.password;

            await user.save();

            res.status(201).json({
                status: true,
                message: `Password chnaged successfully.`,
            });
        } else {
            res.status(404).json({ status: false, message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


// activated or deactivated user profile ...........
export const activateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (user) {
            user.isActive = req.body.isActive;

            await user.save();

            res.status(201).json({
                status: true,
                message: `User account has been ${user?.isActive ? "activated" : "disabled"}`,
            })
        } else {
            res.status(404).json({ status: false, message: "User not found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


// delete user profile /..................... 
export const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndDelete(id);

        res.status(200).json({ status: true, message: "User deleted successfully!" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};






// isAdmin ? createJWT(res, user._id) : null ,,,,,,,,,,,,,,
//if you register and ac , now the individual user can't register an ac , it is the admin who create the ac for them , so if i create the ac and the row is equal to an admin then i create a JWT for myself but if i create the ac and it is a user i am creating the ac we don't have to create a JWT  because that is not the ac for me it was someone and that person when that person logs in that person will get the token ,,, so that 's why we are checking that if isAdim is true then we create the JWT we send the req we also send the userid


// -------- difference between req.user and req.params----
// req.user ID:-------------
// The userId extracted from req.user typically represents the authenticated user's ID. This ID is obtained after the user has been successfully authenticated, usually through a login process.
// This ID is associated with the user who is currently authenticated and making the request.

// req.params ID:------------------
// The id extracted from req.params represents a parameter in the URL path.This parameter is often used to identify a specific resource being targeted by the request.
// For example, in a route like / users /: id, if a request is made to / users / 123, req.params.id would be '123'.
// This ID is typically used to perform actions or retrieve data related to a specific resource, such as fetching a user's profile information based on their ID.



// find all Notifications controller explaination ..........

// Notification.find({ team: userId, isRead: { $nin: [userId] } }): It queries the Notification model to find notifications where:
// The team array includes the user ID(userId), meaning the user is part of the team associated with the notification.
// The isRead array does not include the user ID(userId), meaning the notification has not been read by the user yet.
// .populate("task", "title"): This populates the task field of each notification with the corresponding Task document, fetching only the title field of the task.





// test users =======================================

// 1. {
//     "email": "admin@gmail.com",
//         "name": "rakesh pal",
//             "isAdmin": true,
//                 "password": "12345",
//                     "role": "Admin",
//                         "title": "Administrotor"
// }

