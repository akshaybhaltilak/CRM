import React, { useState } from 'react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    setTasks([...tasks, { title: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Task Management</h2>
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Task Title"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={addTask}>
        Add Task
      </button>

      <ul className="mt-4">
        {tasks.map((task, index) => (
          <li key={index} className={`border p-2 mb-2 ${task.completed ? 'line-through' : ''}`}>
            {task.title}
            <button
              className="ml-2 text-sm bg-green-500 text-white p-1 rounded"
              onClick={() => toggleTask(index)}
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManagement;
