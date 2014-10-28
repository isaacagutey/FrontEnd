$(document).ready(function() {
    //Declare Variables
    var i; var x=1; var text; var mins; var secs; var mins2; var secs2; var rem; var rem2; var title;

    //Store music data in an array
    var playlist = new Array ();
    playlist[1]=["wisdom_audio/Earl Nightingale - The Miracle of Your Mind.mp3"];
    playlist[2]=["wisdom_audio/19 Minutes That Can Change Your Life! (Listen and Learn!).mp3"];
    playlist[3]=["wisdom_audio/Pirates Of The Caribbean Soundtrack.mp3"];
    playlist[4]=["gospel_audio/Darlene Zschech  Yours Forever (You Took the Nails).mp3"];
    playlist[5]=["gospel_audio/In Jesus Name.mp3"];
    playlist[6]=["gospel_audio/Victor's Crown  by Darlene Zschech from.mp3"];
    var song = new Audio(playlist);
    //song source equals the index of the array
    song.src = playlist[x];

    songtime=$('#songtime');
    timeleft=$('#timeleft');

    timeleft.text(' --:-- ');
    songtime.text(' --:-- ');

    $('#timeline').slider({});

    $('#shuffle').click(function(){
        if($(this).hasClass('shuffle-off')){
            $(this).removeClass('shuffle-off');
            $(this).addClass('shuffle-on')

        }else{
            $(this).removeClass('shuffle-on');
            $(this).addClass('shuffle-off');
        }
    });

    //When the play button is clicked
    $("#playButton").click(function () {


        //Replace the play button with a pause button and start playing song
        if ($(this).hasClass('playButton')) {
            $(this).removeClass('playButton');
            $(this).addClass('pauseButton');
            song.play();
            $('li:nth-child('+(x)+')').addClass('zem');
            //Read the title of the song and print to screen
            title = "";
            for (i=13; i < playlist[x][0].length; i += 1) {
                title += playlist[x][0][i];
            }
            text = '<h4 ><em><span style="color: white">' + title + '</span></em></h4>';
            $("marquee").html(text);
            //When the current song ends, move to the next song, else if its the last song end play
            song.addEventListener('ended',function()
            {

                if ($('#shuffle').hasClass('shuffle-on')){
                    x=Math.floor(Math.random()*6+1);
                    song.src=playlist[x];
                    song.play();
                    $('li:nth-child('+(x)+')').addClass('zem');
                    title="";
                    for (i=13; i<playlist[x][0].length; i+=1)
                    {
                        title += playlist[x][0][i];
                    }
                    text = '<h4 ><em><span style="color: white">' + title + '</span></em></h4>';
                    $("marquee").html(text);
                }


                else if ($("#loop-none").hasClass('loop')) {
                    song.currentTime=0;
                    song.play();
                }else if(x===playlist.length-1)
                {
                    song.pause();
                    song.currentTime=0;
//                        $(this).removeClass('pauseButton');
//                        $(this).addClass('playButton');

                }else {
                    $('li:nth-child('+(x)+')').removeClass('zem');
                    x+=1;
                    song.src = playlist[x];
                    $('li:nth-child('+(x)+')').addClass('zem');
                    $('li:nth-child('+(x-1)+')').removeClass('zem');
                    song.play();
                    title = "";
                    for (i = 13; i < playlist[x][0].length; i += 1) {
                        title += playlist[x][0][i];
                    }
                    text = '<h4 ><em><span style="color: white">' + title + '</span></em></h4>';
                    $("marquee").html(text);
                }


            });
        } else {

            $(this).removeClass('pauseButton');
            $(this).addClass('playButton');
            song.pause();
        }
        //Calculate the song duration and display the song current time
        $(song).bind('timeupdate', function(){
            rem = parseInt(song.duration - song.currentTime, 10);
            secs = rem - mins*60;
            mins = Math.floor(rem/60,10);
            mins2= Math.floor(rem2/60,10);
            rem2=parseInt(0+song.currentTime);
            secs2 = rem2 - mins2*60;

            if(isNaN(mins)||isNaN(secs)) {
                timeleft.text('--' + ':' + '--');

            }else{
                timeleft.text('-' + mins + ':' + (secs > 9 ? secs : '0' + secs));
            }
            if(isNaN(mins2)||isNaN(secs2)){
                songtime.text('--' + ':' + '--');
            }else {
                songtime.text(mins2 + ':' + (secs2 > 9 ? secs2 : '0' + secs2));
            }
            //Update the slider postion to the song's current time
            $('#timeline').slider({
                value: song.currentTime,
                step: 0.01,
                animate: true,
                range: "min",
                max: song.duration,
                slide: function () {
                    manualSeek = true;
                },
                stop: function (e, ui) {
                    manualSeek = false;
                    song.currentTime = ui.value;
                }
            });
        });
    });

    $('#loop-none').click(function(){
        if ($(this).hasClass('no-loop')) {
            $(this).removeClass('no-loop');
            $(this).addClass('loop');
        }else {
            $(this).removeClass('loop');
            $(this).addClass('no-loop')
        }
    });
//        $('#loop-none').hover(function(){
//
//        });

    //When the next button is clicked
    $('#nextButton').click(function(){
        x+=1; //Increase the index of the playlist by one
        $('li:nth-child('+(x)+')').addClass('zem');
        $('li:nth-child('+(x-1)+')').removeClass('zem');
        if (x>=playlist.length){
            x = 1; //Restart the song to its initial index when the value of the counter x is greater then the
            $('li:nth-child('+(x)+')').addClass('zem');
            $('li:nth-child('+(x-1)+')').removeClass('zem');

            title="";
            for (i=13; i<playlist[x][0].length; i+=1)
            {
                title += playlist[x][0][i];
            }
            text = '<h4 ><em><span style="color: white">' + title + '</span></em></h4>';
            $("marquee").html(text);

            song.src=playlist[x];
            if ($('#playButton').hasClass('playButton'))
            {
                song.pause();
            }else{
                song.play()
            }

        }else{
            song.src = playlist[x];
            if ($('#playButton').hasClass('playButton'))
            {
                song.pause();
            }else{
                song.play()
            }

            title="";
            for (i=13; i<playlist[x][0].length; i+=1)
            {
                title += playlist[x][0][i];
            }
            text = '<h4 ><em><span style="color: white">' + title + '</span></em></h4>';

            $("marquee").html(text);
        }
    });

    //When the previous button is click
    $('#prevButton').click(function(){
        x-=1; //Move the index of the playlist array one step backwards
        $('li:nth-child('+(x)+')').addClass('zem');
        $('li:nth-child('+(x+1)+')').removeClass('zem');

        if (x<=0){ //If the value of the counter x is less than or equal to -1,
            x =playlist.length-1; // Make the value of the counter equal to last element in the array
            $('ol:nth-child('+(x)+')').addClass('zem');
            $('ol:nth-child('+(x-2)+')').removeClass('zem');
            title=""; //Remove the title of the previous song
            //Read the title of the current playing song
            for (i=13; i<playlist[x][0].length; i+=1)
            {
                title += playlist[x][0][i];
            }
            //Print the song title  to the screen
            text = '<h4 ><em><span style="color: white">' + title + '</span></em></h4>';
            $("marquee").html(text);

            //Check to see if the player is already on pause, if on pause don't, pause song, else play song
            song.src=playlist[x];
            if ($('#playButton').hasClass('playButton'))
            {
                song.pause();
            }else{
                song.play()
            }

        }else{
            song.src = playlist[x];
            if ($('#playButton').hasClass('playButton'))
            {
                song.pause();
            }else{
                song.play()
            }

            title="";
            for (i=13; i<playlist[x][0].length; i+=1)
            {
                title += playlist[x][0][i];
            }
            text = '<h4 ><em><span style="color: white">' + title + '</span></em></h4>';

            $("marquee").html(text);
        }
    });

    $('li:nth-child(n)').click(function(){

        x=4; //Increase the index of the playlist by one
        if (x===4){
            $(this).addClass('zem');
        }
        for (i=13; i<playlist[x][0].length; i+=1)
        {
            title += playlist[x][0][i];
        }
        text = '<h4 ><em><span style="color: white">' + title + '</span></em></h4>';
        $("marquee").html(text);

        song.src = playlist[x];
        if ($('#playButton').hasClass('playButton')) {
            $('#playButton').removeClass('playButton');
            $('#playButton').addClass('pauseButton');}

        song.play();

        title="";
        for (i=13; i<playlist[x][0].length; i+=1)
        {
            title += playlist[x][0][i];
        }
        text = '<h4 ><em><span style="color: white">' + title + '</span></em></h4>';

        $("marquee").html(text);
        $(song).bind('timeupdate', function(){
            rem = parseInt(song.duration - song.currentTime, 10);
            secs = rem - mins*60;
            mins = Math.floor(rem/60,10);
            mins2= Math.floor(rem2/60,10);
            rem2=parseInt(0+song.currentTime);
            secs2 = rem2 - mins2*60;

            if(isNaN(mins)||isNaN(secs)) {
                timeleft.text('--' + ':' + '--');

            }else{
                timeleft.text('-' + mins + ':' + (secs > 9 ? secs : '0' + secs));
            }
            if(isNaN(mins2)||isNaN(secs2)){
                songtime.text('--' + ':' + '--');
            }else {
                songtime.text(mins2 + ':' + (secs2 > 9 ? secs2 : '0' + secs2));
            }
            //Update the slider postion to the song's current time
            $('#timeline').slider({
                value: song.currentTime,
                step: 0.01,
                animate: true,
                range: "min",
                max: song.duration,
                slide: function () {
                    manualSeek = true;
                },
                stop: function (e, ui) {
                    manualSeek = false;
                    song.currentTime = ui.value;
                }
            });
        });
    });
    $("li, .no-loop, .loop, #shuffle").mouseenter(function() {
        var sound = new Audio('s_effect/Blop.mp3');
        sound.play();
    });
});