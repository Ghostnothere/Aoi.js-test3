module.exports = ({
		name: "channelinfo",
		aliases: ["ci"],
		code: `
$reply[$messageID;
{title:Channel Information}
{field:Name:<#$channel[$findChannel[$message];id]> **\`$channel[$findChannel[$message];name]\`**}
{field:ID:$channel[$findChannel[$message];id]}
{field:Topic:$replaceText[$channel[$findChannel[$message];topic];null;No topic.]}
{field:Channel Type:$replaceText[$replaceText[$replaceText[$replaceText[$channel[$findChannel[$message];type];text;Text Channel];voice;Voice Channel];category;Category Channel];news;News Channel]}
{field:Category:<#$channel[$findChannel[$message];parentid]>}
{field:Position:$channel[$findChannel[$message];position]}
{field:Created At:$channel[$findChannel[$message];created]}
{timestamp:ms}
{color:RANDOM}]
`
});