module.exports = {
 name: "messages",
 code: `$title[Message Count]
$thumbnail[$userAvatar[$findMember[$message]]]
$description[<@$findMember[$message]> has $getUserVar[messages;$findMember[$message]] messages!]
$footer[Requested by $userTag[$authorID]]
$color[#303136]
`
};