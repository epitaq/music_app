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
            onReady: ready2,
        }
    });
}

var videoId = ['M7lc1UVf-VE','68KV7JnrvDo','glbYC6rBn3g'];
var videoStart = [10, 2, 4]
var videoEnd = [14, 5, 5]

function ready () {
    for (let i=0; i<videoId.length; i++ ) {
        console.log(i)
        console.log(videoId[i])
        player.loadVideoById({
            'videoId': videoId[i],
            'startSeconds': videoStart[i],
            'endSeconds': videoEnd[i],
            'suggestedQuality': 'small'});
    }
};

// var videoList = [['M7lc1UVf-VE',10,14], ['68KV7JnrvDo',2,5], ['glbYC6rBn3g',4,6]]
// function ready1 () {
//     for await (var element of videoList){
//         setTimeout(stop, 3000)
//         console.log(element[0])
//     }
// }
function stop(){}

function ready2 () {
    for (let i=0; i<videoId.length; i++ ) {
        setTimeout(timeStop(i), 3000)
    }
};

function timeStop (i){
    console.log(i)
    console.log(videoId[i])
    player.loadVideoById({
        'videoId': videoId[i],
        'startSeconds': videoStart[i],
        'endSeconds': videoEnd[i],
        'suggestedQuality': 'small'});
}
