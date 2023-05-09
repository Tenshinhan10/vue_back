const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
let data = [
  {
    "id": 1,
    "fname": "John",
    "lname": "Doe",
    "username": "johndoe",
    "password": "password123",
    "email": "johndoe@example.com",
    "image": "https://wallpapers.com/images/featured/b3bkt91v6p4vj5xq.jpg"
  },
  {
    "id": 2,
    "fname": "Jane",
    "lname": "Doe",
    "username": "janedoe",
    "password": "password456",
    "email": "janedoe@example.com",
    "image": "https://wallpapers.com/images/featured/b3bkt91v6p4vj5xq.jpg"
  }
];

app.use(express.json()); // enable JSON request body parsing
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
// GET /data
app.get('/data', (_req, res) => {
  res.json(data);
});

// POST /data
app.post('/data', (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT /data/:id
app.put('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = {...data[index], ...updatedItem, id};
    res.json(data[index]);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE /data/:id
app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = data.find(user => user.username === username && user.password === password);
  if (user) {
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
