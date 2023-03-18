let MixString = [ '28444', '614c97', '27ba49', 'c4280', '582233' ];
let secretOne = "27";
let secretTwo = "80502";

let secret = secretTwo.split("").reverse().join("");

let stepOne = MixString.join("").split("").reverse().join("");
let stepTwo = stepOne.split(secretOne);

stepThree = stepTwo[0] + stepTwo[1];

key = (stepThree + secret);
