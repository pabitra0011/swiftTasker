import express from "express"
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";
import { createSubtask, createTask, dashboardStatistics, deleteRestoreTask, getTask, getTasks, postTaskActivity, trashTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();


router.post("/create", protectRoute, isAdminRoute, createTask);

router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get('/', protectRoute, getTasks);
router.get('/:id', protectRoute, getTask);

router.put('/create-subtask/:id', protectRoute, isAdminRoute, createSubtask);
router.put('/update/:id', protectRoute, isAdminRoute, updateTask);
router.put('/:id', protectRoute, isAdminRoute, trashTask);

router.delete('/delete-restore/:id', protectRoute, isAdminRoute, deleteRestoreTask);

export default router;

// all funcs
// createTask, duplicateTask, postTaskactivity, getTasks, getTask, updateTask, trashTask, createSubtask, deleteRestoreTask, dashboardStistics