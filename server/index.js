const express = require('express');
const app = express();

const postRoutes = require('./routes/posts.routes');

app.use(express.json());
app.use("/", postRoutes);

//middlaware de error
app.use(function(error, request, response, next) {
  if (error.message === 'Post already exists!') {
    response.status(409).send(error.message);
  }

  if (error.message === 'Post not found!') {
    response.status(404).send(error.message);
  }

  response.status(500).send(error.message);
});

app.listen(3333);