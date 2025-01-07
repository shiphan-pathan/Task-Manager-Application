
import React, { useEffect, useState } from 'react';
import { handleSuccess, handleError } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();


  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5050/tasks', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const openTaskForm = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-title">Tasks Manager App</div>
        <button className="add-task-button" onClick={openTaskForm}>
          + Add Task
        </button>
        <div className="navbar-right">
          <h3 className="loggedin-user">{loggedInUser}</h3>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {showTaskForm && (
        <div className="taskform-popup">
          <div className="taskform-popup-content">
            <TaskForm
              fetchTasks={fetchTasks}
              closePopup={() => setShowTaskForm(false)}
              initialTask={editingTask}
              isEditing={!!editingTask}
            />
          </div>
        </div>
      )}

      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        onEdit={(task) => {
          setEditingTask(task);
          setShowTaskForm(true);
        }}
      />
      <ToastContainer />
    </>
  );
};

export default Navbar;
