module.exports = ({
name: "create",
aliases: "create",
code: `$onlyIf[$checkContains[$message;sohappy;tenguy;afraid;apcr;older;aag;atis;alyt;biw;stew;blb;bihw;kermit;bd;ch;cbg;wonka;cb;gandalf;keanu;cryingfloor;dsm;disastergirl;live;ants;doge;trump;drake;ermg;facepalm;feelsgood;firsttry;fwp;fa;fbf;fmr;fry;ggg;grumpycat;harold;hipster;icanhas;crazypills]==true;The valid types are: sohappy,tenguy,afraid,apcr,older,aag,atis,alyt,biw,stew,blb,bihw,kermit,bd,ch,cbg,wonka,cb,gandalf,keanu,cryingfloor,dsm,disastergirl,live,ants,doge,trump,drake,ermg,facepalm,feelsgood,firsttry,fwp,fa,fbf,fmr,fry,ggg,grumpycat,harold,hipster,icanhas,crazypills]
$title[$message[1] Meme]
$image[https://api.memegen.link/images/$message[1]/$replaceText[$replaceText[$message; ;_;-1];$message[1];;1]]
$footer[Requested by $username]
$color[$random[1234;56789]]
$addTimestamp
$botTyping
$cooldown[5s;Pleasure wait 3 second before use the command again.]
$suppressErrors[Error Occurred.Please try again later.]`});
