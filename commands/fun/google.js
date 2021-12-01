module.exports = ({
name: "google",
code: `$title[**GOOGLE SEARCH**]
$description[https://www.google.com/search?q=$message]
$color[RANDOM]
$OnlyIf[$message==; Please type a message to search Google.]`
})