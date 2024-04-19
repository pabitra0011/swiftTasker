import mongoose, { Schema } from "mongoose"

const notificationSchema = new Schema({
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    text: { type: String },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    notiType: { type: String, default: "alert", enum: ["alert", "message"] },
    isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
},
    { timestamps: true }

);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;





// This defines a Mongoose schema for notifications.Each notification has fields like team(an array of user IDs), text(the notification message), task(a reference to a Task document), notiType(notification type, either "alert" or "message"), and isRead(an array of user IDs representing users who have read the notification).