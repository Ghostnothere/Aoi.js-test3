module.exports = ({
 name: "clyde",
 code: `$argsCheck[>1;message]
$image[https://ctk-api.herokuapp.com/clyde/$replaceText[$message; ;%20;-1]]
$color[#ff2050]`
});