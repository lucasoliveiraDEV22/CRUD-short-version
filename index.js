const express = require("express");
const port = 3001;
const app = express();
app.use(express.json());
const uuid = require("uuid");

const checkUserId = (req, res, next) => {
  const { id } = req.params;

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    res.status(404).json({ error: "User not found" });
  }
  req.userIndex = index;
  req.userId = id;
  next();
};

const users = [];
app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name, age } = req.body;
  const user = { id: uuid.v4(), name, age };
  users.push(user);

  res.status(201).json(user);
});

app.put("/users/:id", checkUserId, (req, res) => {
  const { name, age } = req.body;
  const index = req.userIndex;
  const id = req.userId;
  const updatedUser = { id, name, age };
  users[index] = updatedUser;
  res.json(updatedUser);
});

app.delete("/users/:id", checkUserId, (req, res) => {
  const index = req.userIndex;

  users.splice(index, 1);

  res.status(204).json();
});
app.listen(port, () => {
  console.log(`Server started on port ${port} 🚀
    `);
});
