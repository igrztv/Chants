define([
	'backbone'
],
function(
    Backbone
){
  
	var MicrophoneModel = Backbone.Model.extend({
		defaults: {
			AudioContext : window.AudioContext || window.webkitAudioContext,
			audioContext : null,
			isPlaying : false,
			sourceNode : null,
			analyser : null,
			theBuffer : null,
			DEBUGCANVAS : null,
			mediaStreamSource : null,
			rafID : null,
			tracks : null,
			buflen : 1024,
			buf : null,
			noteStrings : ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
			MIN_SAMPLES : 0,  // will be initialized when AudioContext is created.
		},
		initialize: function(){
			console.log('initialize');
			buf = new Float32Array(buflen);
			audioContext = new AudioContext();
			console.log('initialized');
		},
		openMic: function(){
			console.log('openMic');
			try {
		        navigator.getUserMedia = 
		        	navigator.getUserMedia ||
		        	navigator.webkitGetUserMedia ||
		        	navigator.mozGetUserMedia;
		        navigator.getUserMedia({
					"audio": {
						"mandatory": {
							"googEchoCancellation": "false",
							"googAutoGainControl": "false",
							"googNoiseSuppression": "false",
							"googHighpassFilter": "false"
						},
						"optional": []
						},
					}, 
					function(stream){
						console.log(stream);
						mediaStreamSource = audioContext.createMediaStreamSource(stream);
						// Connect it to the destination.
						analyser = audioContext.createAnalyser();
						analyser.fftSize = 2048;
						mediaStreamSource.connect( analyser );
						updatePitch();
					},
					function(){
						alert('Stream generation failed. Maybe microphone API is not allowed for this page');
					}
				);
		    } catch (e) {
		        alert('getUserMedia threw exception :' + e);
		    }
		},
		rec: function(){
		},
		stop: function(){
		},
		correlation: function(){
			//this is absolutly 'math' function = global variable independent
			var SIZE = buf.length;
			var MAX_SAMPLES = Math.floor(SIZE/2);
			var best_offset = -1;
			var best_correlation = 0;
			var rms = 0;
			var foundGoodCorrelation = false;
			var correlations = new Array(MAX_SAMPLES);

			for (var i=0;i<SIZE;i++) {
				var val = buf[i];
				rms += val*val;
			}
			rms = Math.sqrt(rms/SIZE);
			if (rms<0.01) // not enough signal
				return -1;

			var lastCorrelation=1;
			for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
				var correlation = 0;

				for (var i=0; i<MAX_SAMPLES; i++) {
					correlation += Math.abs((buf[i])-(buf[i+offset]));
				}
				correlation = 1 - (correlation/MAX_SAMPLES);
				correlations[offset] = correlation; // store it, for the tweaking we need to do below.
				if ((correlation>0.9) && (correlation > lastCorrelation)) {
					foundGoodCorrelation = true;
					if (correlation > best_correlation) {
						best_correlation = correlation;
						best_offset = offset;
					}
				} else if (foundGoodCorrelation) {
					var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
					return sampleRate/(best_offset+(8*shift));
				}
				lastCorrelation = correlation;
			}
			if (best_correlation > 0.01) {
				console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
				return sampleRate/best_offset;
			}
			return -1;
		},
		updatePitch: function(){
			var cycles = new Array;
			analyser.getFloatTimeDomainData( buf );
			var ac = autoCorrelate( buf, audioContext.sampleRate );
		 	if (ac == -1) {
		 		//no output data
		 	} else {
			 	pitch = ac;
			 	pitchElem.innerText = Math.round( pitch ) ;
				var note = Math.round( 12 * (Math.log( pitch / 440 )/Math.log(2) ) ) + 69;
				console.log('note: ' + noteStrings[note%12]);	
				var note = 440 * Math.pow(2,(note-69)/12);
				var detune = Math.floor( 1200 * Math.log( pitch / note)/Math.log(2) );				
				if (detune == 0 ) {
					//no output data
				} else {
					if (detune < 0)
						console.log('flat');
					else
						console.log('sharp');
					console.log('detuneAmount = ' + Math.abs( detune ));
				}
			}

			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = window.webkitRequestAnimationFrame;
			console.log(this);
			rafID = window.requestAnimationFrame( updatePitch );
		}
	});

    return MicrophoneModel;
});
