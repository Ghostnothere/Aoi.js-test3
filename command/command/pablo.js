module.exports = ({
 name: "pablo",
 code: `$if[$checkContains[$message;everyone]==true]
$image[https://api.berk404.ga/pabloeveryone?text=$replaceText[$message;+; ;-1]]
$else
$image[https://api.berk404.ga/pablo?text=$replaceText[$message;+; ;-1]]
$endif`
});