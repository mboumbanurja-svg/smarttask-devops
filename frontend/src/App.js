import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = '/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  // Charger les tâches
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
    }
  };

  // Ajouter une tâche
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Basculer le statut d'une tâche
  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Supprimer une tâche
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="app">
      <header>
        <h1>📋 SmartTask</h1>
        <p>Gérez vos tâches efficacement</p>
      </header>

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Ajouter une nouvelle tâche..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">Aucune tâche pour le moment</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
              <span onClick={() => toggleTask(task.id, task.completed)}>
                {task.title}
              </span>
              <button onClick={() => deleteTask(task.id)}>🗑️</button>
            </div>
          ))
        )}
      </div>

      <footer>
        <p>SmartTask - {tasks.filter(t => t.completed).length}/{tasks.length} tâches complétées</p>
      </footer>
    </div>
  );
}

export default App;
