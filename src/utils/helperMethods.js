// Found here: https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
export function generateId() {
  return (
    Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
  )
}
