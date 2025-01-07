
import React from 'react';
import { handleSuccess, handleError } from '../utils';

const TaskList = ({ tasks, fetchTasks, onEdit }) => {
  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5050/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the task');
      }

      handleSuccess('Task deleted successfully!');
      fetchTasks();
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="task-lists">
      <div className="task-list">
        <h2>My Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks available. Add a new task!</p>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;



