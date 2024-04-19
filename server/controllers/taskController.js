import Task from '../models/task.js';
import Notification from '../models/notification.js'
import User from '../models/user.js';


// creating a new task .......................... ......
export const createTask = async (req, res) => {
    try {
        const { userId } = req.user;

        const { title, team, stage, date, priority, assets } = req.body;

        let Ntxt = "New task has been assigned to you ";
        if (team?.length > 1) {
            Ntxt = Ntxt + ` and ${team?.length - 1} others.`;
        }
        Ntxt = Ntxt + ` The task priority is set a ${priority}, so check and act accordingly. The task date is ${new Date(date).toDateString()}. Thank You !`

        const activity = {
            type: "assigned",
            activity: Ntxt,
            by: userId,
        }

        const task = await Task.create({
            title,
            team,
            stage: stage.toLowerCase(),
            date,
            priority: priority.toLowerCase(),
            assets,
            activities: activity,
        });

        await Notification.create({
            team,
            text: Ntxt,
            task: task._id
        })

        res
            .status(200)
            .json({ status: true, task, message: "Task created successfully." });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}


// post a tsk activity .............................. 
export const postTaskActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const { type, activity } = req.body;

        const task = await Task.findById(id).populate('team');

        const data = {
            type,
            activity,
            by: userId,
        };

        task.activities.push(data);

        await task.save();

        let Ntxt = `New task activity added on ${new Date().toDateString()}, type = ${type} and activity = ${activity} `;
        // console.log(team)
        // console.log(task.team)
        await Notification.create({
            team: task.team,
            text: Ntxt,
            task: task._id
        })

        res
            .status(200)
            .json({ status: true, message: "Activity posted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}


//  get all dashboardStatistics....................
export const dashboardStatistics = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user;

        const allTasks = isAdmin
            ? await Task.find({
                isTrashed: false,
            })
                .populate({
                    path: "team",
                    select: "name role title email",
                })
                .sort({ _id: -1 })
            : await Task.find({
                isTrashed: false,
                team: { $all: [userId] },
            })
                .populate({
                    path: "team",
                    select: "name role title email",
                })
                .sort({ _id: -1 });

        const users = await User.find({ isActive: true })
            .select("name title role isAdmin createdAt")
            .limit(10)
            .sort({ _id: -1 });

        //   group task by stage and calculate counts
        const groupTasks = allTasks.reduce((result, task) => {
            const stage = task.stage;

            if (!result[stage]) {
                result[stage] = 1;
            } else {
                result[stage] += 1;
            }

            return result;
        }, {});

        // Group tasks by priority fro graph data 
        const graphData = Object.entries(
            allTasks.reduce((result, task) => {
                const { priority } = task;

                result[priority] = (result[priority] || 0) + 1;
                return result;
            }, {})
        ).map(([name, total]) => ({ name, total }));

        // calculate total tasks
        const totalTasks = allTasks?.length;
        // for in dashboard page showing latest 10 tasks
        const last10Task = allTasks?.slice(0, 10);

        // final obj send to the clinet resp 
        const summary = {
            totalTasks,
            last10Task,
            users: isAdmin ? users : [],
            tasks: groupTasks,
            graphData: graphData,
        }

        res.status(200).json({
            status: true,
            message: "Successfully",
            ...summary,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}



// get all tasks ................................. 
export const getTasks = async (req, res) => {
    try {
        const { stage, isTrashed } = req.query;
        const { userId, isAdmin } = req.user;
        // console.log(userId, isAdmin)

        let query = { isTrashed: isTrashed ? true : false };

        if (stage) {
            query.stage = stage;
        }

        let queryRes = Task.find(query).populate({
            path: "team",
            select: "name title email",
        }).sort({ _id: -1 });

        // if admin then return all tasks otherwise filter task accroding to current user
        // if admin then return all tasks otherwise filter tasks according to current user
        if (isAdmin) {
            const tasks = await queryRes;

            return res.status(200).json({ status: true, tasks });

        } else {
            // Filter tasks where the user is part of the team
            const tasks = await queryRes;

            const userTasks = tasks.filter(task => {
                for (const member of task.team) {
                    if (member._id.toString() === userId.toString()) {
                        return true;
                    }
                }
                return false;
            });
            // console.log("User tasks:", userTasks);
            return res.status(200).json({ status: true, tasks: userTasks });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}



// get a single task ................................. 
export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        const task = await Task.findById(id).populate({
            path: "team",
            select: "name title role email",
        }).populate({
            path: "activities.by",
            select: "name",
        });

        res.status(200).json({
            status: true,
            task,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}



export const createSubtask = async (req, res) => {
    try {
        const { title, tag, date } = req.body;

        const { id } = req.params;

        const newSubTask = {
            title,
            date,
            tag,
        };

        const task = await Task.findById(id);

        task.subTasks.push(newSubTask);

        await task.save();

        res
            .status(200)
            .json({ status: true, message: "SubTask added successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}



export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, team, stage, priority, assets } = req.body;

        const task = await Task.findById(id);

        task.title = title;
        task.date = date;
        task.priority = priority.toLowerCase();
        task.assets = assets;
        task.stage = stage.toLowerCase();
        task.team = team;

        await task.save();

        res
            .status(200)
            .json({ status: true, message: "Task duplicated successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}



export const trashTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        task.isTrashed = true;

        await task.save();

        res.status(200).json({
            status: true,
            message: `Task trashed successfully.`,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
}


export const deleteRestoreTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if (actionType === "delete") {
            await Task.findByIdAndDelete(id);

        } else if (actionType === "deleteAll") {
            await Task.deleteMany({ isTrashed: true });

        } else if (actionType === "restore") {
            const rtask = await Task.findById(id);

            rtask.isTrashed = false;
            rtask.save();

        } else if (actionType === "restoreAll") {
            await Task.updateMany(
                { isTrashed: true },
                { $set: { isTrashed: false } }
            );
        }

        res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: `Error performing ${actionType}: ${error.message}` });

    }
}






