import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import { connectToDb } from "./config/db.js";
import express, { urlencoded } from "express";
import session from "express-session";
import authRouter from "./routes/auth.route.js";
import requestIp from 'request-ip';
import cors from 'cors';
import { productRouter } from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import errorHandler from './middlewares/error.middleware.js';


const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure should only be true in production — hardcoded true breaks local dev (HTTP)
        secure: isProduction,
        sameSite: isProduction ? "None" : "lax"
    }
}));
app.use(requestIp.mw());

const allowedOrigins = isProduction
    ? [
        "https://exclusive-shopping-website-frontend.onrender.com",
        "https://exclusive-shopping-website-admin.onrender.com"
    ]
    : [
        "http://localhost:5173",
        "http://localhost:5174"
    ];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));


app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.use(errorHandler);


app.listen(PORT, () => {
    connectToDb();
    console.log("server is listening at PORT: ", PORT);
});
