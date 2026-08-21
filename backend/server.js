const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SmartTask Backend is running!' });
});

// Routes des tâches (simulées)
let tasks = [
  { id: 1, title: 'Apprendre Docker', completed: false },
  { id: 2, title: 'Maîtriser Jenkins', completed: false },
  { id: 3, title: 'Faire le TP SmartTask', completed: false }
];

// GET - Récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET - Récupérer une tâche par ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST - Ajouter une nouvelle tâche
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT - Mettre à jour une tâche
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

// DELETE - Supprimer une tâche
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(index, 1);
  res.json({ message: 'Task deleted successfully' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📋 API endpoints:`);
  console.log(`  GET    /api/tasks     - Récupérer toutes les tâches`);
  console.log(`  GET    /api/tasks/:id - Récupérer une tâche`);
  console.log(`  POST   /api/tasks     - Ajouter une tâche`);
  console.log(`  PUT    /api/tasks/:id - Modifier une tâche`);
  console.log(`  DELETE /api/tasks/:id - Supprimer une tâche`);
});
