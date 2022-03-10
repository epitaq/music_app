videoJson = {
    "contents": [
        {
            "Id": "M7lc1UVf-VE",
            "movie": "M7lc1UVf-VE",
            "start": "10",
            "end": "14"
        },
        {
            "Id": "68KV7JnrvDo",
            "movie": "68KV7JnrvDo",
            "start": "2",
            "end": "5"
        },
        {
            "Id": "glbYC6rBn3g",
            "movie": "glbYC6rBn3g",
            "start": "4",
            "end": "6"
        }
    ]
}

// https://qiita.com/tkgtamagohan/items/d2e56cbfc8af460c623a これを参照

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
        videoId: videoList[count].movie,
        playerVars: {
            start: videoList[count].start,
            end: videoList[count].end
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// 動画リスト
// var videoList = [['M7lc1UVf-VE',10,14], ['68KV7JnrvDo',2,5], ['glbYC6rBn3g',4,6]]
var videoList = videoJson['contents']
//console.log(videoList)
//console.log(videoList.length)
var count = 0
//doneは動画再生中はfalse、次の動画の読み込み中にtrue
var done = false
function onPlayerStateChange(event){
    //console.log(count)
    if (event.data==0 && !done){
        count += 1;
        done = true;
        if (count > videoList.length-1){
            count = 0
        }
        player.loadVideoById({
            videoId: videoList[count].movie,
            startSeconds:  videoList[count].start,
            endSeconds: videoList[count].end
        });
    } else if (event.data == 1 && done){
        done = false;
    }
}