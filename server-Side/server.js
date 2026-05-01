import express from "express";
import dotenv from "dotenv"
import connectDB from "./src/config/database.js";
import router from "./src/routes/router.js";
import cors from 'cors'
import session from 'express-session'
import passport from "./src/config/passport.js";
import Notification from "./src/model/notifications.js";

const PORT = process.env.PORT || 4050
const app=express()
dotenv.config()
connectDB()

// Clean up old login notifications
Notification.deleteMany({ type: "login" }).then(() => {
    console.log("Old login notifications cleaned up");
}).catch(err => console.error("Error cleaning notifications:", err));

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(passport.initialize());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use("/api/auth",router)
// app.use("/post/user",router)

app.get("/",(req,res)=>{
    res.json({ message: "MongoDB connected", status: "success" })
})

app.listen(PORT,()=>{
    console.log(`server running under  http://localhost:${PORT}`)
})