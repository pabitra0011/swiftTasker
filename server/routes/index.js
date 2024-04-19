import express from "express"
import userRoutes from './userRoutes.js'
import taskRoutes from './taskRoutes.js'

const router = express.Router();

router.use("/api/user", userRoutes)  //like:  api/user/login
router.use("/api/task", taskRoutes)

export default router;