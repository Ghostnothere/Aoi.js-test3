module.exports = ({
  name: "$alwaysExecute",
  code: `$if[$toLowercase[$message]==spam]
dont not spam
  $endif
  $onlyIf[$checkContains[$guildID;739811956638220298;797833180936667153]==false;]`
})