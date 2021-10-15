module.exports = ({
name: "ship",
code:  `
$onlyIf[$mentioned[1]!=;pls mention someone]
$argsCheck[>2;you need 2 people to ship!]
$username[$mentioned[1]] and $username[$mentioned[2]]
$title[Let's see how you two match up!]
$description[$randomText[
$random[0;10]% ⚪⚫⚫⚫⚫⚫⚫⚫⚫⚫ 😭;$random[11;20]% ⚪⚪⚫⚫⚫⚫⚫⚫⚫⚫ 😢;$random[21;30]% ⚪⚪⚪⚫⚫⚫⚫⚫⚫⚫ 😕;$random[31;40]% ⚪⚪⚪⚪⚫⚫⚫⚫⚫⚫ 🙄;$random[41;50]% ⚪⚪⚪⚪⚪⚫⚫⚫⚫⚫ 😊;
$random[51;60]% ⚪⚪⚪⚪⚪⚪⚫⚫⚫⚫ 🥰;
$random[61;70]% ⚪⚪⚪⚪⚪⚪⚪⚫⚫⚫ 😍;
$random[71;80]% ⚪⚪⚪⚪⚪⚪⚪⚪⚫⚫ 🤩;
$random[81;90]% ⚪⚪⚪⚪⚪⚪⚪⚪⚪⚫ 💕;$random[91;100]% ⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪ 💗]
]
$color[ff7286]
$cooldown[20s;Please wait %time% so you will have 1% on matching up.]`

})