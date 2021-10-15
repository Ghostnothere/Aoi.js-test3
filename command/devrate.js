module.exports = ({
 name: 'devrate',
 description: 'See how dev you are (100% real)',
 usage: 'devrate (\User\)',
 aliases: ['howdev'],
 code: ` $title[dev r8 machine]
$description[$replaceText[$replaceText[$checkCondition[$message==];true;**You** are];false;**$username** is] $random[1;100]% dev]
$color[RANDOM]`
})