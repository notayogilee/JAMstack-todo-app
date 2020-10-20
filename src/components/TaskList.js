import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, refreshTasks }) {
  return (
    <div>
      <h2 className="my-4">Tasks</h2>
      {tasks && tasks.map(task =>
        <TaskCard key={task._id} task={task} refreshTasks={refreshTasks} />
      )}
    </div>
  )
}
