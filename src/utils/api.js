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
