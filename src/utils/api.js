export function fetchCategories() {
  return fetch('http://localhost:5001/categories', {
    headers: { Authorization: 'Authorization' }
  }).then(response => response.json())
}
