import express from "express"
import cors from "cors"
import {v4 as uuid} from "uuid"

const db = new Map();
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PATCH", "DELETE"],
};
const port = 5000;
const app = express();

app.use(express.json());
app.use(cors(corsOptions))

app.get("/todos", (_, res) => {
  res.send(Array.from(db.values()))
})

app.get("/todos/:id", (req, res) => {
  const todo = db.get(req.params.id);

  res.send(todo || {id: "", text: "", title: ""})
})

app.post("/new-todo", (req, res) => {
  const {text, title} = req.body;

  if (text && title) {
    const id = uuid();

    db.set(id, {...req.body, id});
    res.sendStatus(200)
  }
});

app.patch("/update-todo/:id", (req, res) => {
  const {text, title} = req.body;
  const {id} = req.params;

  if (text || title) {
    const todo = db.get(id);

    if (todo) {
      db.set(id, {id, text: text || todo.text, title: title || todo.title})
      res.sendStatus(200)
    }

    res.sendStatus(400);
  }
});

app.delete("delete-todo/:id", (req, res) => {
  const {id} = req.params
  if (db.has(id)) {
    db.delete(id);
    res.send(true)
  }

  res.send(false)
})

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});