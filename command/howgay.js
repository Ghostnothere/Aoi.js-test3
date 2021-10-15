module.exports = ({
 name: 'howgay',
 description: 'See how gay you are (100% real)',
 usage: 'howgay (\User\)',
 aliases: ['gayrate'],
 code: ` $title[gay r8 machine]
$description[$replaceText[$replaceText[$checkCondition[$message==];true;**You** are];false;**$username** is] $random[1;100]% gay :gay_pride_flag:]
$color[RANDOM]`
})