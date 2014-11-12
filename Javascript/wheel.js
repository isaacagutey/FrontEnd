var wheel5=0;
var wheel4=0;
var wheel3=0;




function  spin(){
    wheel5=Math.floor((Math.random() * 2000) + 1000);
    wheel4=Math.floor((Math.random() * 4000) + 3000);
    wheel3=Math.floor((Math.random() * 5000) + 4000);
    for (i=0;i<=wheel5;i++){

        $("#wheel5").css("transform","rotate("+wheel5+"deg)");
        $("#wheel4").css("transform","rotate("+wheel4+"deg)");
        $("#wheel3").css("transform","rotate("+wheel3+"deg)");
    }
}

setTimeout(spin,1000);

setInterval(spin,30000);


