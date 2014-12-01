var VolD = VolG = VolBalance = 0.5;
var SpeedG, SpeedD;
var playG, playD;

SC.initialize({
    client_id: 'b3bee43f97dd7fc2c777679cb276ab9f'
});
$(document).ready(function() {
    $("#searchValue").keyup(function(event){
        if(event.keyCode === 13){
			search($('#searchValue').val());
        }
    });
    $('#searchButton').click(function() {
        search($('#searchValue').val());
    });
});
function search(val){
    SC.get("/tracks", {q: val}, function(tracks){
        var length = tracks.length;
        for (var i = 0; i < length; i++){
if (tracks[i].stream_url !== undefined)
    $('#results').append('<p id="titleMusic'+ i +'" onclick="initurl(\''+tracks[i].stream_url+'\');">'+ tracks[i].title +' <img src="'+tracks[i].artwork_url+'" /> </p>');
        }
    });
}

var context, buffer1 ,buffer2;
var source1, source2;
var startOffset1 = 0, startOffset2 = 0;
var startTime1 = 0,startTime2 = 0 ;
var act1 = 0, act2 = 0;
var numplayer = 0;
var vol1 = 1, vol2 = 1;
var vit1 = 1, vit2 = 1;

url = ['https://api.soundcloud.com/tracks/71196332/stream?client_id=b3bee43f97dd7fc2c777679cb276ab9f','https://api.soundcloud.com/tracks/140364012/stream?client_id=b3bee43f97dd7fc2c777679cb276ab9f'];
//url = ['coin.mp3','oasis.mp3'];

try {
    // still needed for Safari
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // create an AudioContext
    context = new webkitAudioContext();
} catch(e) {
    // API not supported
    console.log('Web Audio API not supported.');
}

var gainNode1 = (typeof context.createGain === 'undefined') ? context.createGainNode() : context.createGain();
gainNode1.gain.value = VolG;
gainNode1.connect(context.destination);
var gainNode2 = (typeof context.createGain === 'undefined') ? context.createGainNode() : context.createGain();
gainNode2.gain.value = VolD;
gainNode2.connect(context.destination);

init(url);

function initurl(val){
    if (act1 === 0){
        stop(1);
        url[0] = String(val) + '?client_id=b3bee43f97dd7fc2c777679cb276ab9f';
        numplayer = 1;
        init(url);
    }    
    else if(act2 === 0){
        stop(2);
        url[1] = String(val) + '?client_id=b3bee43f97dd7fc2c777679cb276ab9f';
        numplayer = 2;
        init(url);
    }
    else
        alert("Les canaux sont pleins.");
}

function init(url){
    bufferLoader = new BufferLoader(context,url,finishedLoading);
    bufferLoader.load();
}

function finishedLoading(bufferList) {
	if (numplayer === 1){
		source1 = context.createBufferSource();
		source1.buffer = bufferList[0];
		buffer1 = source1.buffer;
		source1.connect(gainNode1);
		gainNode1.connect(context.destination);
		console.log('Finished Loading terminé 1');
	}
	else if(numplayer === 2){
		source2 = context.createBufferSource();
		source2.buffer = bufferList[1];
		buffer2 = source2.buffer;
		source2.connect(gainNode2);
		gainNode2.connect(context.destination);
		console.log('Finished Loading terminé 2');
	}
	else if(numplayer === 0){
		source1 = context.createBufferSource();
		source1.buffer = bufferList[0];
		buffer1 = source1.buffer;
		source1.connect(gainNode1);
		gainNode1.connect(context.destination);
		source2 = context.createBufferSource();
		source2.buffer = bufferList[1];
		buffer2 = source2.buffer;
		source2.connect(gainNode2);
		gainNode2.connect(context.destination);
		console.log('Finished Loading terminé 0');
	}
	console.log('Finished Loading terminé');
}

function mute(num){
	if  (num === 1){
		if (gainNode1.gain.value > 0){
			volume1 = gainNode1.gain.value;
			gainNode1.gain.value = 0;
		}
		else
			gainNode1.gain.value = VolG;
	}
	else if(num === 2){
		if (gainNode2.gain.value > 0){
			volume2 = gainNode2.gain.value;
			gainNode2.gain.value = 0;
		}
		else
			gainNode2.gain.value = VolD;
	}
}

function play_pause(picked_object){
	var numplayer;
	if (picked_object == tourneDisqueG)
		numplayer = 1;
	else if (picked_object == tourneDisqueD)
		numplayer = 2;
		
	if (numplayer === 1){
		if (act1 === 0){
			play(1);
			$("#playPause").addClass("pause").removeClass("play");
		}        
		else{
			pause(1);
			$("#playPause").addClass("play").removeClass("pause");
		}
	}
	else if (numplayer === 2){
		if (act2 === 0){
			play(2);
			$("#playPause2").addClass("pause").removeClass("play");
		}    
		else{
			pause(2);
			$("#playPause2").addClass("play").removeClass("pause");
		}
	}
}

function play(num) {
	numplayer = num;
	if (numplayer === 1){
		startTime1 = context.currentTime;
		source1 = context.createBufferSource();
		source1.buffer = buffer1;
		source1.playbackRate.value = vit1;
		source1.connect(gainNode1);
		gainNode1.connect(context.destination);
		source1.start(0, startOffset1 % buffer1.duration);
		play1 = true;
		act1 = 1;
	}
	else if (numplayer === 2){
		startTime2 = context.currentTime;
		source2 = context.createBufferSource();
		source2.playbackRate.value = vit2;
		source2.buffer = buffer2;
		source2.connect(gainNode2);
		gainNode2.connect(context.destination);
		source2.start(0, startOffset2 % buffer2.duration);
		play2 = true;
		act2 = 1;
	}
}
    
function pause(num) {
	numplayer = num;
	if (numplayer === 1){
		source1.stop();
		vit1 = source1.playbackRate.value;
		startOffset1 += context.currentTime - startTime1;
		play1 = false;
		act1 = 0;
	}
	else if (numplayer === 2){
		source2.stop();
		vit2 = source2.playbackRate.value;
		startOffset2 += context.currentTime - startTime2;
		play2 = false;
		act2 = 0;
	}
}

function volume1(val){
	gainNode1.gain.value = val;
}
function volume2(val){
	gainNode2.gain.value = val;
}

function tempo1(val){
    source1.playbackRate.value = val;
    vit1 = val;
}
function tempo2(val){
    source2.playbackRate.value = val;
    vit2 = val;
}

function crossfading(element) {
    var x = parseInt(element.value) / parseInt(element.max);
    var gain1 = Math.cos(x * 0.5*Math.PI);
    var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);
    gainNode1.gain.value = gain1;
    gainNode2.gain.value = gain2;
}

