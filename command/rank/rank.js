module.exports = ({
  name: "testing-rank",
  code: `$author[👍| tus niveles;$authorAvatar]
  $description[> level: $getUserVar[lvl;$mentioned[1;yes]]
  > xp: $getUSerVar[xp;$mentioned[1;yes]]
  > next level: $getUserVar[xp;$mentioned[1;yes]]/$getUserVar[reqxp;$mentioned[1;yes]]
  ]
  $color[RANDOM]`
})