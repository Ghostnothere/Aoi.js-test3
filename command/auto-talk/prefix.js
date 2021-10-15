module.exports = {
  name: "$alwaysExecute",
  code: `
  $if[$checkContains[$message;<@!$clientID>;<@$clientID>]==true]
  <@$authorID> my prefix here is \`$getServerVar[Prefix]\` you can use\`$getServerVar[Prefix]help\`
  $endif
  $suppressErrors`
}