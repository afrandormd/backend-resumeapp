import express from "express"
import AuthRouter from "./routes/auth.router.js";
import morgan from "morgan";
import 'dotenv/config'
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";
import compression from "compression";
import ResumeRouter from "./routes/resume.router.js";
import cors from "cors";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

const app = express();
const port = process.env.PORT;

await connectDB();

app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true
  });
  next();
});

// Middlewares
app.use(cors({
  origin: "https://foliora-black.vercel.app",
  credentials: true
}))
app.use(helmet())
app.use(ExpressMongoSanitize())
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(compression());

// Parent Routing
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/resume', ResumeRouter);

// Health Check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume Builder API is running",
    timestamp: new Date().toISOString(),
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


