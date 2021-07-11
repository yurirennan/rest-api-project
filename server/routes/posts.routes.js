const express = require('express');

const postsService = require('../services/postsService');

const routes = express.Router();

routes.get('/posts', async function (request, response, next) {
  try {
    const posts = await postsService.getPosts();
    response.json(posts);
  } catch (e) {
    next(e);
  }
});

routes.post('/posts', async function (request, response, next) {
  const post = request.body;

  try {
    const createdPost = await postsService.savePost(post);
    response.status(201).json(createdPost);
  } catch (e) {
    next(e);
  }
});

routes.get('/posts/:id', async function (request, response, next) {
  const id = request.body;

  try {
    const post = postsService.getPost(id);
    response.json(post);
  } catch (e) {
    next(e);
  }
});

routes.put('/posts/:id', async function (request, response, next) {
  const post = request.body;

  try {
    await postsService.updatePost(post);
    response.status(204).end();
  } catch (e) {
    next(e);
  }

})

routes.delete('/posts/:id', async function (request, response, next) {
  const id = request.params.id;

  try {
    await postsService.deletePost(id);
    response.status(204).end();
  } catch (e) {
    next(e);
  }
})


module.exports = routes;