module.exports = ({
name: "setage",
code: `$title[Success]
$description[I have set your age to \`$message\`]
$footer[Requested by $usertag;$authoravatar]
$addtimestamp
$color[#303136]
$setglobaluservar[age;$message]`
})