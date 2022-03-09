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
        }
    });
}

// function timeControl () {
//     player.seekTo(3, true);
//     setTimeout(stopVideo, 6000);
// }


function stopVideo() {
    //player.stopVideo();
    player.nextVideo();
}

// player.cuePlaylist({listType: 'playlist',
//     list: ['M7lc1UVf-VE','ak70cSvN4s0','Bh2IuX7C1IQ'],
//     index: 0,
//     startSeconds: 5,
// })

// onReadyのコールバック関数
function onPlayerReady() {
    player.cuePlaylist({
        'listType': 'search',
        //'playlist': ['ak70cSvN4s0','M7lc1UVf-VE','Bh2IuX7C1IQ'],
        'playlist': ['M7lc1UVf-VE'],
        'index': 0,
        //'startSeconds': 3,
        'suggestedQuality': 'small'
    });
}

function onPlayerStateChange (event) {
    var status = event.data
    console.log(status)
    if (status == 1) {
        setTimeout(stopVideo, 6000)
    }
    // if (status == 2) {
    //     player.nextVideo();
    // }
}

// 止めても時間が経つと再生しちゃう　それ以外はいい感じ