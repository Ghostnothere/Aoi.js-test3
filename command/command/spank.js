module.exports = ({
 name: "spank",
 code: `$image[https://api.devs-hub.xyz/spank?face=$authorAvatar&face2=$userAvatar[$mentioned[1;yes]]]
$argsCheck[>1;You need to mention the person you want to spank!]`
});