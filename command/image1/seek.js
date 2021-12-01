module.exports = ({
name: "seekto",
code: `
$seekTo[$message]
Seeked into $message
$onlyIf[$isNumber[$message]==true;:x: Please provide a valid number to seek into!]
$onlyIf[$message!=;:x: Please provide a number to seek into!]
$onlyIf[$voiceID!=;You are not on a voice channel!]`})