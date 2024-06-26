import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import { dbConnection } from "./utils/index.js"
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js"

import router from "./routes/index.js"



dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000

const app = express();

// here i specify that we accept connection from only localhost 3000
// => if we use like this ==> app.use(cors("*")), it means we accept connection from anywhere 
// app.use(cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));
// app.use(cors());

app.use(cors({
    origin: ["http://localhost:3000", "https://swift-tasker.vercel.app"],
    // origin: 'https://swift-tasker.vercel.app',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Welcome to my backend service!");
});

app.use("/api", router)


// this below middleware is use, when you hit an endpoint url that does not exist , bleow is handle our all error
app.use(routeNotFound)
app.use(errorHandler)



app.listen(PORT, () => {
    console.log(`Server starting on ${PORT}`);
})