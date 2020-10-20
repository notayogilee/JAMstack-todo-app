const GET_TASKS = `
query{
  allTasks{
    data{
      _id,
      title,
      description,
      priority
    }
  }
}`;

const CREATE_TASK = `
  mutation($title: String!, $description: String!, $priority: Int) {
    createTask( data: {title: $title, description: $description, priority: $priority}) {
     title,
     description,
     priority,
     _id
    }
  }
`;

const UPDATE_TASK = `
mutation($id: ID!, $title: String!, $description: String!, $priority: Int) {
  updateTask( id: $id, data: {title: $title, description: $description, priority: $priority}) {
    title,
    description,
    priority,
    _id
  }
}
`;

const DELETE_TASK = `
mutation($id: ID!) {
  deleteTask( id: $id) {
    _id
  }
}
  `;

module.exports = {
  GET_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK
}