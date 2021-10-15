module.exports = ({
name: "roast",
aliases: "rt",
code: `
$description[**$jsonRequest[https://evilinsult.com/generate_insult.php?lang=en&type=text]**]`
})