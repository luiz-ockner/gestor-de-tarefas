import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', { title: newTaskTitle });
      setTasks([...tasks, res.data]);
      setNewTaskTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const res = await api.put(`/tasks/${taskId}`, updatedData);
      setTasks(tasks.map(task => (task._id === taskId ? res.data : task)));
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-start p-4 bg-gray-100">
      <div className="w-full max-w-2xl">
  <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minhas Tarefas</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Sair
        </button>
      </div>

  <form onSubmit={handleCreateTask} className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Nova tarefa..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Adicionar
          </button>
        </div>
      </form>

  <ul className="bg-white rounded-lg shadow-lg">
        {tasks.map(task => (
          <li key={task._id} className="p-4 border-b last:border-0">
            {editingTask?._id === task._id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="flex-1 px-2 py-1 border rounded"
                />
                <button
                  onClick={() => handleUpdateTask(task._id, { title: editingTask.title })}
                  className="ml-2 bg-green-500 text-white py-1 px-2 rounded-lg"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="ml-2 bg-gray-500 text-white py-1 px-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-lg">{task.title}</span>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {task.status}
                  </span>
                  <button
                    onClick={() => setEditingTask(task)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default TaskList;