
import React, { useState, useEffect } from 'react';
import { handleSuccess, handleError } from '../utils';

const TaskForm = ({ fetchTasks, closePopup, initialTask, isEditing }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    ...initialTask,
  });

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = isEditing
      ? `http://localhost:5050/tasks/${initialTask.id}`
      : 'http://localhost:5050/tasks';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      const result = await response.json();
      if (response.ok) {
        handleSuccess(
          isEditing ? 'Task updated successfully!' : 'Task created successfully!'
        );
        fetchTasks(); 
        closePopup();
      } else {
        handleError(result.message || 'Error processing task');
      }
    } catch (error) {
      handleError('Something went wrong');
    }
  };

  return (
    <div className="task-form">
      <h2>{isEditing ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
        <button type="button" className="cancel" onClick={closePopup}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm;


