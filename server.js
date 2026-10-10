import express from "express"
import AuthRouter from "./routes/auth.router.js";
import morgan from "morgan";
import 'dotenv/config'
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";
import compression from "compression";
import ResumeRouter from "./routes/resume.router.js";

const app = express();
const port = process.env.PORT;

await connectDB();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(compression());

// Parent Routing
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/resume', ResumeRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


