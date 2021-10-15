module.exports = ({
 name: "$alwaysExecute",
 code:
 `
 $setUserVar[messages;$sum[$getUserVar[messages];1]]
 `
})