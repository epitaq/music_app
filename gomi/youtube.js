// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        // videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        // playerVars: {
        // }
    });
}


function nextVideo() {
    //player.stopVideo();
    // player.nextVideo();
    var status = player.getPlayerState()
    if (status == 1) {
        player.nextVideo();
    } 
}

function seekTo () {
    player.seekTo(3,true)
}


// onReadyのコールバック関数
function onPlayerReady() {
    player.cuePlaylist({
        'listType': 'search',
        'playlist': ['M7lc1UVf-VE','68KV7JnrvDo','glbYC6rBn3g'],
        'index': 0,
        'suggestedQuality': 'small'
    });
}

function onPlayerStateChange (event) {
    var status = event.data
    console.log(status)
    if (status == 1) {
        setTimeout(nextVideo, 6000)
    }
    // if (status == 2) {
    //     player.nextVideo();
    // }
}

