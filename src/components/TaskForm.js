import React, { useState } from 'react';

export default function TaskForm({ refreshTasks }) {

  const [showTaskForm, setShowTaskForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority(1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, description, priority }
    try {
      const res = await fetch("/api/createTask", {
        method: "POST",
        body: JSON.stringify(body),
      });
      resetForm();
      refreshTasks();
      setShowTaskForm(false);

    } catch (err) {
      console.error(err);
    }
  }

  const cancel = (e) => {
    e.preventDefault();
    setShowTaskForm(false);
  }

  return (
    <div>
      {!showTaskForm &&
        <button className="btn btn-primary btn-block" onClick={() => setShowTaskForm(true)}>Add A New Task</button>
      }

      {showTaskForm &&
        <div className="card">
          <div className="card-header">Add Task</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="decription">Task Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Priority</label>
                <input
                  type="number"
                  name="priority"
                  className="form-control"
                  value={priority}
                  onChange={e => setPriority(parseInt(e.target.value))}
                  min="1"
                  max="5"
                />
              </div>
              <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">Submit</button>
              <button onClick={cancel} type="submit" className="btn btn-danger btn-block">Cancel</button>
            </form>
          </div>
        </div>
      }
    </div>
  )
}
