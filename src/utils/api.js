export function fetchCategories() {
  return fetch('http://localhost:5001/categories', {
    headers: { Authorization: 'Authorization' }
  }).then(response => response.json())
}

export function fetchPosts() {
  return fetch('http://localhost:5001/posts', {
    headers: { Authorization: 'Authorization' }
  }).then(response => response.json())
}

export function fetchPost(postId) {
  return fetch(`http://localhost:5001/posts/${postId}`, {
    headers: { Authorization: 'Authorization' }
  }).then(response => response.json())
}

export function adjustPostScore(post, option) {
  return fetch(`http://localhost:5001/posts/${post.id}`, {
    method: 'post',
    headers: {
      Authorization: 'Authorization',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: option })
  }).then(response => response.json())
}

export function fetchComments(postId) {
  return fetch(`http://localhost:5001/posts/${postId}/comments`, {
    headers: { Authorization: 'Authorization' }
  }).then(response => response.json())
}

export function addComment(comment) {
  return fetch(`http://localhost:5001/comments`, {
    method: 'post',
    headers: {
      Authorization: 'Authorization',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(response => response.json())
}

export function adjustCommentScore(commentId, option) {
  return fetch(`http://localhost:5001/comments/${commentId}`, {
    method: 'post',
    headers: {
      Authorization: 'Authorization',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: option })
  }).then(response => response.json())
}

export function deleteComment(commentId) {
  return fetch(`http://localhost:5001/comments/${commentId}`, {
    method: 'delete',
    headers: {
      Authorization: 'Authorization',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

export function updateComment(commentId, updatedComment) {
  return fetch(`http://localhost:5001/comments/${commentId}`, {
    method: 'put',
    headers: {
      Authorization: 'Authorization',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedComment)
  }).then(response => response.json())
}

export function updatePost(postId, updatedPost) {
  return fetch(`http://localhost:5001/posts/${postId}`, {
    method: 'put',
    headers: {
      Authorization: 'Authorization',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedPost)
  }).then(response => response.json())
}
