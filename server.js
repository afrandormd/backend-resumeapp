import express from "express"
import AuthRouter from "./routes/auth.router.js";
import morgan from "morgan";
import 'dotenv/config'
import connectDB from "./configs/db.js";

const app = express();
const port = process.env.PORT;

await connectDB();

app.use(express.json());
app.use(morgan("dev"))

// Parent Routing
app.use('/api/v1/auth', AuthRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


