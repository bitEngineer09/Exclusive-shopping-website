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

const app = express();
const PORT = process.env.PORT;

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "mysecret", resave: true, saveUninitialized: true }));
app.use(requestIp.mw());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}))


app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);


app.listen(PORT, () => {
    connectToDb();
    console.log("server is listening at PORT: ", PORT);
});