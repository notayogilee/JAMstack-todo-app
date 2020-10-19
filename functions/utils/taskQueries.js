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
  mutation($title: String!, $description: String!) {
    createTask( data: {title: $title, description: $description, priority: 1}) {
     title,
     description,
     priority,
     _id
    }
  }
`;

module.exports = {
  GET_TASKS,
  CREATE_TASK
}