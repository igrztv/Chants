define(function() {

		var audioContext = new (window.AudioContext || window.webkitAudioContext)();
		var isPlaying = false;
		var sourceNode = null;
		var analyser = null;
		var theBuffer = null;
		var mediaStreamSource = null;
		var rafID = null;
		var tracks = null;
		var buflen = 1024;
		var buf = new Float32Array( buflen );
		var noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
		var MIN_SAMPLES = 0;
		var recording = false;

		function requireMicrophone(){
		    navigator.getUserMedia = 
		    	navigator.getUserMedia ||
		    	navigator.webkitGetUserMedia ||
		    	navigator.mozGetUserMedia;
		    navigator.getUserMedia(
				{
					'audio': {
						'mandatory': {
							'googEchoCancellation': 'false',
							'googAutoGainControl': 'false',
							'googNoiseSuppression': 'false',
							'googHighpassFilter': 'false'
						},
						'optional': []
					},
				},
				function(stream){
					console.log('stream');
					console.log(stream);
					mediaStreamSource = audioContext.createMediaStreamSource(stream);
					//debugger;
					analyser = audioContext.createAnalyser();
					analyser.fftSize = 2048;
					mediaStreamSource.connect( analyser );
					//updatePitch();
				},
				function(){
					alert('Stream generation failed.');
				}
			);			
		};

		function autoCorrelate( buf, sampleRate ) {
			//this is absolutly 'math' function = global variable independent
			var SIZE = buf.length;
			var MAX_SAMPLES = Math.floor(SIZE/2);
			var best_offset = -1;
			var best_correlation = 0;
			var rms = 0;
			var foundGoodCorrelation = false;
			var correlations = new Array(MAX_SAMPLES);

			for (var i = 0; i < SIZE; i++){
				rms += buf[i]*buf[i];
			}
			rms = Math.sqrt(rms/SIZE);
			if (rms < 0.01){				
				return -1; // not enough signal
			}
			if(rms > 0.25){
				return -2; //looking like noise
			}

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
					return {pitch: sampleRate/(best_offset+(8*shift)), meanPower: rms};
				}
				lastCorrelation = correlation;
			}
			if (best_correlation > 0.01) {
				// console.log('f = ' + sampleRate/best_offset + 'Hz (rms: ' + rms + ' confidence: ' + best_correlation + ')')
				return {pitch: sampleRate/best_offset, meanPower: rms};
			}
			return -1;
			//	var best_frequency = sampleRate/best_offset;
		};

		function record(state){
			recording = state;
			console.log('recording = ' + recording);
			return recording;
		};

		function updatePitch( time ) {

			if(recording === false){
				return -4;
			}
			if(analyser === undefined){
				return -3;
			}

			var result = {
				pitch: -1,
				noteStrings: -1,
				detune: 0
			};

			analyser.getFloatTimeDomainData( buf );
			var ac = autoCorrelate( buf, audioContext.sampleRate );

			if (ac === -1) {
				return -2;
			}

		 	if (ac === -1) {
		 		//default drawings
		 	} else {
		 		var pitch = ac.pitch;
			 	result.pitch = Math.round( pitch );
			 	result.meanPower = ac.meanPower;
				var noteNum = 12 * (Math.log( pitch / 440 )/Math.log(2) );
				var note = Math.round( noteNum ) + 69;
				result.noteStrings = noteStrings[note%12];
				var note = 440 * Math.pow(2,(note-69)/12);
				var detune = Math.floor( 1200 * Math.log( pitch / note)/Math.log(2) );
				
				if (detune == 0 ) {
					//no detune to draw
				} else {
					if (detune < 0){
						//draw flat detune
					} else {
						//draw sharp detune
					}
					result.detune = Math.abs( detune );
				}
			}
			return result;
		};

	return {
		updatePitch: updatePitch,
		requireMicrophone: requireMicrophone,
		record: record,
	};
});