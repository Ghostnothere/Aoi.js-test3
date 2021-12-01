module.exports = ({
 name: "kiss",
 code: `
 
 $color[f1852a]
 $description[<@$authorID> kissed <@$mentioned[1]>]
 $image[$jsonRequest[https://no-api-key.com/api/v2/kiss;image;https://no-api-key.com/image/kiss/39598.gif]]
 
 $onlyIf[$mentioned[1]!=;You want to kiss yourself? or me :flushed:]`
}) 