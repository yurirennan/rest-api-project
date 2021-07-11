const postsData = require('../data/postsData');

exports.getPosts = function () {
  return postsData.getPosts();
}

exports.savePost = async function (post) {
  const existingPost = await postsData.getPostByTitle(post.title);

  if (existingPost) throw new Error('Post already exists!');

  return postsData.savePost(post);
}

exports.deletePost = function (id) {
  return postsData.deletePost(id);
}

exports.updatePost = async function (post) {
  await exports.getPost(post.id);

  return postsData.updatePost(post);
}

exports.getPost = async function (id) {
  const post = await postsData.getPost(id);

  if (!post) {
    throw new Error('Post not found!');
  }

  return post;
}