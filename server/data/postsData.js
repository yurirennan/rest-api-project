const database = require('../infra/database');

exports.getPosts = function() {
  return database.query('SELECT * FROM posts');
};

exports.savePost = function(post) {
  return database.query('INSERT INTO posts(title, content) VALUES($1, $2) returning *', [post.title, post.content]);
};

exports.deletePost = function(id) {
  return database.query('DELETE FROM posts WHERE posts.id = $1', [id]);
};

exports.updatePost = function(post) {
  return database.none('UPDATE posts SET title = $1, content = $2 where id = $3', 
  [ post.title, post.content, post.id ]);
};

exports.getPost = function(id) {
  return database.oneOrNone('SELECT * FROM posts WHERE id = $1', [ id ]);
}

exports.getPostByTitle = function(title) {
  return database.oneOrNone('SELECT * FROM posts WHERE title = $1', [ title ]);
}
