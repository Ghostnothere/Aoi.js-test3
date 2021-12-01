module.exports = ({
name: "wallpaper", 
code: `$title[Here's your wallpaper]
$attachment[$jsonRequest[https://xenon-api.ksjjxgghsubzinbdyx.repl.co/misc/$message[1]/wallpaper;url;error];wallpaper.png]
$color[RANDOM]
$onlyIf[$checkContains[pc;mobile];
{author:$userTag[$authorID]:$authorAvatar}
{description:$getVar[no] Invalid \`<number>\` given.

Usage:
\`wallpaper <pc or wallpaper>\`}
{color:RED}]`
}) 