import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import M from 'materialize-css/dist/js/materialize.min.js';

export default function TaskForm({ refreshTasks }) {

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {
        classes: "string"
      });
    });
  }, [])

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
      const res = await fetch("/.netlify/functions/createTask", {
        method: "POST",
        body: JSON.stringify(body),
      });
      resetForm();
      setShowTaskForm(false);
      refreshTasks();

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
        <div className="fixed-action-btn">
          <a onClick={() => setShowTaskForm(true)} className="btn-floating btn-large green lighten-1">
            <i className="large material-icons">add</i>
          </a>
        </div>

      }

      {
        showTaskForm &&

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
                <label htmlFor="title">Title</label>
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
                <label htmlFor="textarea1">Description</label>
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
                <label htmlFor="priority">Priority</label>
              </div>
            </div>


          </form>
          <a className="waves-effect green lighten-4 green-text btn left" onClick={handleSubmit}><i className="material-icons left">check</i>add task</a>
          <a className="waves-effect green lighten-4 green-text btn right" onClick={cancel}><i className="material-icons left">close</i>cancel</a>
        </div>
      }
      {/* <div className="card">
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
        </div> */}

    </div>
  )
}
