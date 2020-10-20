import React, { useState, Fragment } from 'react'

export default function TaskCard({ task, refreshTasks }) {

  const [showEditForm, setShowEditForm] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  const deleteTask = async () => {
    const id = task._id;
    try {
      await fetch('./.netlify/functions/deleteTask', {
        method: "DELETE",
        body: JSON.stringify({ id })
      });
      refreshTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, description, priority, _id: task._id }
    try {
      const res = await fetch("/.netlify/functions/updateTask", {
        method: "PUT",
        body: JSON.stringify(body),
      });

      refreshTasks();
      setShowEditForm(false);

    } catch (err) {
      console.error(err);
    }
  }

  const cancel = (e) => {
    e.preventDefault();
    setShowEditForm(false);
  }


  return (
    <div className="card">
      {!showEditForm &&
        <Fragment>
          <div className="card-header">
            {task.title}
          </div>
          <div className="card-body">
            <p>{task.description}</p>
            <h6 className="small">Priority: {task.priority}</h6>
          </div>
          <div className="card-footer">
            <button className="btn btn-success mr-2" onClick={() => setShowEditForm(true)}>
              Edit
        </button>
            <button className="btn btn-danger" onClick={deleteTask}>
              Delete
        </button>
          </div>
        </Fragment>
      }
      {showEditForm &&
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
