const express = require('express');
const app = express();
const port = 500; // You can choose any port you prefer
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const mongoURI = 'mongodb+srv://manoharmns04:manoharmns04@cluster0.wqnkwp3.mongodb.net/your-database-name';
// Replace 'your-database-name' with the actual name of your MongoDB database

// Define a Mongoose schema for tasks
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

// Create a Mongoose model based on the schema
const Task = mongoose.model('Task', taskSchema);

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      text: req.body.text,
      completed: false,
    });

    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(500).send('Error saving task');
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    await Task.findByIdAndUpdate(taskId, { completed: true });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error marking task as complete:', error);
    res.status(500).send('Error marking task as complete');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
