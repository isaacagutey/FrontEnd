var wheel5=0;
var wheel4=0;
var wheel3=0;
var wheel2=0;
var wheel1=0;



function  spin(){
    wheel5=Math.floor((Math.random() * 5500) + 3000);
    wheel4=Math.floor((Math.random() * 6500) + 4000);
    wheel3=Math.floor((Math.random() * 7500) + 5000);
    wheel2=Math.floor((Math.random() * 8500) + 6000);
    wheel1=Math.floor((Math.random() * 9500) + 7000);
    for (i=0;i<=wheel5;i++){

        $("#wheel5").css("transform","rotate("+wheel5+"deg)");
        $("#wheel4").css("transform","rotate("+wheel4+"deg)");
        $("#wheel3").css("transform","rotate("+wheel3+"deg)");
        $("#wheel2").css("transform","rotate("+wheel2+"deg)");
        $("#wheel1").css("transform","rotate("+wheel1+"deg)");
    }
}

setTimeout(spin,1000);

setInterval(spin,21000);


