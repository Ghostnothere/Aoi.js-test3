module.exports = {
name: "set-ticketcategory",
code: `$title[Success!] $color[00ff00] 
$description[I successfully set the ticket category to $message!]
$setServerVar[ticketcategory;$message]
$onlyIf[$channelExists[$message]==true;Provided Category Doesn't Exist]
$onlyIf[$isNumber[$message]==true;Please provide Category ID.]
$argsCheck[1;{title:Error} {color:ff0000} {description:Follow this format: $getServerVar[prefix]set-ticketcategory <idhere>}]
$onlyPerms[manageserver;You dont have the perms "manageserver"]

`
}