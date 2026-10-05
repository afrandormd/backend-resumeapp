import express from "express"
const port = 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Dunia")
});

app.listen(5000, () => {
  console.log("Server is running on port 3000")
});


