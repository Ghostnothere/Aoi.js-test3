module.exports = ({
  name: "$alwaysExecute",
  code: `$if[$toLowercase[$message]==what]
  are you okey?
  $endif
  $onlyIf[$checkContains[$guildID;739811956638220298;797833180936667153]==false;]`
})
