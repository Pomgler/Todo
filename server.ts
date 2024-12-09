import express from "express"

interface Todo {
  id: string,
  title: string,
  text: string
}

const db = new Map();

const port = 5000;
const app = express();

app.listen(() => {
  console.log(`Server starting on port ${port}`, port);
});

app.get("/todos", (req, res) => {
  
})