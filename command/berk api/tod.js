module.exports = {
 name: "tod",
 code:`
 $setUserVar[mid;$get[mid]]
 
 $let[mid;$channelSendMessage[$channelID;**Truth or Dare ?**;yes]]
 
 $awaitMessages[$authorID;1m;truth,dare;truth,dare]
 `
}