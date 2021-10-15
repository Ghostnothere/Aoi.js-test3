module.exports = ({
 name: 'simprate',
 description: 'See how simp you are (100% real)',
 usage: 'simprate (\User\)',
 aliases: ['howsimp'],
 code:` $title[simp r8 machine]
$description[$replaceText[$replaceText[$checkCondition[$message==];true;**You** are];false;**$username** is] $random[1;100]% simp]
$color[RANDOM]`
})