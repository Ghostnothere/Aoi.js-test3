module.exports = ({
name: "afk",
code: `$setUserVar[AFK;$replaceText[$replaceText[$checkCondition[$splitText[1]==off];true;on];false;off]/$replaceText[$replaceText[$checkCondition[$message==];true;AFK];false;$message]]

$channelSendMessage[$channelID;$replaceText[$replaceText[$checkCondition[$splitText[1]==on];true;Welcome back <@$authorID>, I removed AFK];false;<@$authorID> I set your AFK: $replaceText[$replaceText[$checkCondition[$noMentionMessage==];true;AFK];false;$noMentionMessage]]] 

$setUserVar[time;$replaceText[$replaceText[$checkCondition[$splitText[1]==off];true;$dateStamp];false;]]
$changeNickname[$replaceText[$replaceText[$checkCondition[$ownerID==$authorID];true;$clientID];false;$authorID];$replaceText[$replaceText[$checkCondition[$splitText[1]==off];true;$replaceText[$replaceText[$checkCondition[$ownerID==$authorID];true;$username[$clientID]];false;⟨AFK⟩$nickname[$authorID]]];false;$replaceText[$replaceText[$checkCondition[$ownerID==$authorID];false;$username];true;$username[$clientID]]]]
$textSplit[$getUserVar[AFK];/]
$onlyIf[$getUserVar[command;$commandName]!=disabled;]`
});
 