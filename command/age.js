module.exports = ({
name: "age",
aliases: "getage",
code: `$title[$usertag[$finduser[$message]]'s age]
$description[$getglobaluservar[age;$finduser[$message]]]
$color[#303136
$footer[Requested by $usertag;$authoravatar]
$addtimestamp
`
})