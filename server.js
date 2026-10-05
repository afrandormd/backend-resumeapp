import express from "express"
import AuthRouter from "./routes/auth.router.js";
import morgan from "morgan";
const port = 5000;

const app = express();

app.use(express.json());
app.use(morgan("dev"))

// Parent Routing
app.use('/api/v1/auth', AuthRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


