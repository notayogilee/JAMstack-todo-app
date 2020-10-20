import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, refreshTasks }) {
  return (
    <div>

      {tasks && tasks.map(task =>
        <TaskCard key={task._id} task={task} refreshTasks={refreshTasks} />
      )}


    </div>
  )
}
