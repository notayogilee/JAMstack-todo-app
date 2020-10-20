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
    <div className="row">
      {!showEditForm &&
        <Fragment>
          <div className="row">
            <div className="col s12 m6">
              <div className="card green lighten-4">
                <div className="card-content green-text">
                  <span className="card-title">{task.title}</span>
                  <p>{task.description}</p>
                  <h6>Priority: {task.priority}</h6>
                </div>
                <div className="card-action">
                  <a onClick={() => setShowEditForm(true)} className="green-text" href="#"><i className="material-icons">edit</i></a>
                  <a onClick={deleteTask} className="green-text" href="#"><i className="material-icons">delete</i></a>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      }
      {showEditForm &&

        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder={title}
                  id="title"
                  type="text"
                  className="validate"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="title"></label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="textarea1"
                  className="materialize-textarea"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <label htmlFor="textarea1"></label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input

                  id="priority"
                  type="number"
                  className="validate"
                  min="1"
                  max="5"
                  value={priority}
                  onChange={e => setPriority(parseInt(e.target.value))}
                />
                <label htmlFor="priority"></label>
              </div>
            </div>


          </form>
          <a className="waves-effect green lighten-4 green-text btn left" onClick={handleSubmit}><i className="material-icons left">check</i>save changes</a>
          <a className="waves-effect green lighten-4 green-text btn right" onClick={cancel}><i className="material-icons left">close</i>cancel</a>
        </div>
      }
      {/* <div className="card">
          <div className="card-header">Edit Task</div>
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
        </div> */}

    </div>
  )
}
