module.exports = ({
  name: "$alwaysExecute",
  code: `$if[$toLowercase[$message]==UwU]
  UwU
  $endif
  $onlyIf[$checkContains[$guildID;739811956638220298;797833180936667153]==false;]`
})
