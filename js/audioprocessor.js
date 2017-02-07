// Setup variables
  var audio_context;
  var recorder;
  var unity_object;
  
  // Start and Stop Functions
  function StartRecording(object_name){
    recorder && recorder.record();
    unity_object = object_name;
	console.log("Recording...");
	console.log(unity_object);
  }

  function StopRecording(){	
	recorder && recorder.stop();
    console.log("Stopping");
    
	// create WAV download link using audio data blob
    //createDownloadLink();    

    sendDataWAV();

  }
  
  // Audio proccessing
  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    recorder = new Recorder(input);
  }
  
  function sendDataWAV() {
    recorder && recorder.exportWAV(function(blob) {
	  	var arrayBuffer;
		var fileReader = new FileReader();
		fileReader.onload = function() {
			arrayBuffer = this.result;
			var data = new Uint32Array(arrayBuffer);
			SendMessage(unity_object, "ReceiveAudioDataFromBrowser", data.toString());
			recorder.clear();
		};
		fileReader.readAsArrayBuffer(blob);
	});
  }

  function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var hf = document.createElement('a');
      
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(hf);
      recordingslist.appendChild(li);
    });
  }
  
  function EchoData(info) {
    console.log("response recieved");
    console.log(info);
  }
  
  // On page load
  window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    
    audio_context = new AudioContext;
    console.log('Audio context set up.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    console.log('No live audio input: ' + e);
  });
  };