const axios = require('axios');
const crypto = require('crypto');

const postsService = require('../services/postsService');

//gerador de string aleatória
function generate(){
  return crypto.randomBytes(20).toString('hex');
}

function request(url, method, data){
  return axios({ url, method, data, validateStatus: false});
}

test('Should be able to get all posts', async function() {
  const [post1] = await postsService.savePost({ title: generate(), content: generate()});
  const [post2] = await postsService.savePost({ title: generate(), content: generate()});
  const [post3] = await postsService.savePost({ title: generate(), content: generate()});

  const response = await request('http://localhost:3333/posts', 'get');

  expect(response.status).toBe(200);
  const posts = response.data;

  expect(posts).toHaveLength(3)

  await postsService.deletePost(post1.id);
  await postsService.deletePost(post2.id);
  await postsService.deletePost(post3.id);
})

test('Should be able to save a post', async function() {
  const data = { title: generate(), content: generate()};

  const response = await request('http://localhost:3333/posts', 'post', data);
  
  expect(response.status).toBe(201);

  const [ post ] = response.data;

  expect(post).toHaveProperty('id');
  await postsService.deletePost(post.id);
});

test('Should not be able to save a post', async function() {
  const data = { title: generate(), content: generate()};

  const response1 = await request('http://localhost:3333/posts', 'post', data);
  const response2 = await request('http://localhost:3333/posts', 'post', data);
  
  expect(response2.status).toBe(409);

  const [ post ] = response1.data;

  expect(post).toHaveProperty('id');
  await postsService.deletePost(post.id);
});

test('Should be able to update a post', async function() {
  const [ post ] = await postsService.savePost({ title: generate(), content: generate()});
  post.title = generate();
  post.content = generate();
  
  const response = await request(`http://localhost:3333/posts/${post.id}`, 'put', post);
  expect(response.status).toBe(204);
  const updatedPost = await postsService.getPost(post.id);

  expect(post.title).toBe(updatedPost.title);
  expect(post.content).toBe(updatedPost.content);
  await postsService.deletePost(post.id);
});

test('Should not be able to update a post', async function() {
  const post = {
    id: 1
  };

  const response = await request(`http://localhost:3333/posts/${post.id}`, 'put');

  expect(response.status).toBe(404);
});

test('Should be able to delete a post', async function() {
  const [ post ] = await postsService.savePost({ title: generate(), content: generate()});

  const response = await request(`http://localhost:3333/posts/${post.id}`, 'delete');

  expect(response.status).toBe(204);

  const posts = await postsService.getPosts();

  expect(posts).toHaveLength(0);
});



