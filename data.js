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
    "image": "https://i.etsystatic.com/15418561/r/il/f06c80/3233862560/il_fullxfull.3233862560_jwqd.jpg"
  },
  {
    "id": 2,
    "fname": "Jane",
    "lname": "Doe",
    "username": "janedoe",
    "password": "password456",
    "email": "janedoe@example.com",
    "image": "https://images.statusfacebook.com/profile_pictures/cartoon/Cartoon_Profile_Picture07.jpg"
  },
  {
    "id": 3,
    "fname": "Ten",
    "lname": "Kub",
    "username": "koraphat",
    "password": "tanzaza",
    "email": "ten@example.com",
    "image": "https://pbs.twimg.com/media/Dyg-OCfW0AA9dKp.jpg"
  },
  {
    "id": 4,
    "fname": "Dog",
    "lname": "HogHog",
    "username": "dog123",
    "password": "dogdog555",
    "email": "dogdog555@example.com",
    "image": "https://i.pinimg.com/originals/dc/55/a0/dc55a0fec14d93d9cf6fa32c32f7c7f2.jpg"
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
// GET 1Data /data/:id
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find(item => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
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
