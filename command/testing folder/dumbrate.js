module.exports = ({
 name: 'dumbrate',
 description: 'See how gay you are (100% real)',
 usage: 'dumbrate (\User\)',
 aliases: ['howdumb'],
 code: ` $title[dumb r8 machine]
$description[$replaceText[$replaceText[$checkCondition[$message==];true;**You** are];false;**$username** is] $random[1;100]% dumb]
$color[RANDOM]`
})