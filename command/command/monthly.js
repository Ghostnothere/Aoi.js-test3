module.exports = ({
 name: "monthly",
 code: `$title[Weekly Reward]
$description[Your daily reward is **$$random[100000000;200000000]**]
$footer[Requested by $username]
$globalCooldown[24d;This is a monthly command, meaning it can only be executed...well, monthly. Try again in %time%.]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[100000000;200000000]]]`
});
