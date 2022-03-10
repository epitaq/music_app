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
        videoId: videoList[count][0],
        playerVars: {
            start: videoList[count][1],
            end: videoList[count][2]
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// 動画リスト
var videoList = [['M7lc1UVf-VE',10,14], ['68KV7JnrvDo',2,5], ['glbYC6rBn3g',4,6]]
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
            videoId: videoList[count][0],
            startSeconds:  videoList[count][1],
            endSeconds: videoList[count][2]
        });
    } else if (event.data == 1 && done){
        done = false;
    }
}