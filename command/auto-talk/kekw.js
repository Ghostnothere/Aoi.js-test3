module.exports = ({
  name: "$alwaysExecute",
  code: `$if[$toLowercase[$message]==kekw]
<:kekw:895224437945798686>
  $endif
  $onlyIf[$checkContains[$guildID;739811956638220298;797833180936667153]==false;]`
})
