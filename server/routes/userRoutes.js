import express from "express"
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import { activateUserProfile, changeUserPassword, deleteUserProfile, getNotificationsList, getTeamList, loginUser, logoutUser, markNotificationRead, registerUser, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);

router.get("/notifications", protectRoute, getNotificationsList);
router.put("/read-noti", protectRoute, markNotificationRead);

router.put("/profile", protectRoute, updateUserProfile);


router.put("/change-password", protectRoute, changeUserPassword);


// // //   FOR ADMIN ONLY - ADMIN ROUTES
router
    .route("/:id")
    .put(protectRoute, isAdminRoute, activateUserProfile)
    .delete(protectRoute, isAdminRoute, deleteUserProfile);



export default router;





// protectRoute, isAdminRoute, this two are middleware function, protectRoute is for check if user is login or not and isAdminRoute middleware is for checking user is admin or not  ...... these two are present in authMiddleware.js file