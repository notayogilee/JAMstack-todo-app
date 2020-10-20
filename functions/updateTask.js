const axios = require('axios');
require('dotenv').config();
const { UPDATE_TASK } = require('./utils/taskQueries.js');
const sendQuery = require('./utils/sendQuery');
const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {

  if (event.httpMethod !== "PUT") {
    return formattedResponse(405, { err: "Method not supported" });
  }

  const { title, description, priority, _id: id } = JSON.parse(event.body);
  const variables = { title, description, priority, id };

  try {

    const { updateTask: updatedTask } = await sendQuery(UPDATE_TASK, variables);

    return formattedResponse(200, updatedTask);

  } catch (err) {
    console.error(err);
    return formattedResponse(500, { err: 'Something went wrong' });
  }
};