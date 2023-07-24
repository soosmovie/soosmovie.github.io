var initializeCastApi = function() {
  console.log('initializeCastApi');

  var sessionRequest = new chrome.cast.SessionRequest(
    chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
  var apiConfig = new chrome.cast.ApiConfig(
    sessionRequest, sessionListener, receiverListener);
  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
};

if (!chrome.cast || !chrome.cast.isAvailable) {
  setTimeout(initializeCastApi, 1000);
}

function onInitSuccess() {
  console.log('onInitSuccess');
}

function onError(e) {
  console.log('onError', e);
}

function sessionListener(e) {
  console.log('sessionListener', e);
}

function receiverListener(availability) {
  console.log('receiverListener', availability);

  if(availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
    $(".button").removeAttr("disabled").text("Start");
  }
}

function onSessionRequestSuccess(session) {
  console.log('onSessionRequestSuccess', session);

  var mediaInfo = new chrome.cast.media.MediaInfo(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "video/mp4");
  var request = new chrome.cast.media.LoadRequest(mediaInfo);
  session.loadMedia(request, onMediaLoadSuccess, onError);
}

function onMediaLoadSuccess(e) {
  console.log('onMediaLoadSuccess', e);
}

$(".button").click(function() {
  chrome.cast.requestSession(onSessionRequestSuccess, onError);
});
