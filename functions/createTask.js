const axios = require('axios');
require('dotenv').config();
const { CREATE_TASK } = require('./utils/taskQueries.js');
const sendQuery = require('./utils/sendQuery');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {

  const { title, description, priority } = JSON.parse(event.body);
  const variables = { title, description, priority };

  try {

    const { createTask: createdTask } = await sendQuery(CREATE_TASK, variables);

    return formattedResponse(200, createdTask);

  } catch (err) {
    console.error(err);
    return formattedResponse(500, { err: 'Something went wrong' });
  }
};