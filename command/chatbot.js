module.exports = ({
 name: "chatbot",
 code: `$httpResult[message]
$httpGet[https://api.affiliateplus.xyz/api/chatbot?message=$replaceText[$message; ;+;-1]&botname=$replaceText[$username[$botID]; ;+;-1]&ownername=DEVELOPER_NAME&user=1]
$onlyIf[$message!=;]
$suppressErrors[Sorry, the API is down, we can't fix that, you can ask for help here: https://dsc.chat/codes]
$onlyIf[2==2;REMEMBER TO ENABLE UNSTABLE MODE! IF SOMETHING DON'T WORK, WATCH THE VIDEO!]`
});
 