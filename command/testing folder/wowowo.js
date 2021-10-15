module.exports = {
  name: "coffee", // Imagine not liking coffee
  code: `$title[Random Coffee pics ☕]
  $image[attachment://coffee.jpg]
  $attachment[$jsonRequest[https://coffee.alexflipnote.dev/random.json;file;:x: API Error];coffee.jpg]
  $color[RANDOM]`
}