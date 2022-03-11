// youtube2をリニューアル JSON＿5に対応

// json
videoListJson = {
    "content": [
        {
            "id": "bQBHMPmgX8w-8:36",
            "movie": "bQBHMPmgX8w",
            "name": "ときのそら",
            "title": "KumoHurray!",
            "start": 516,
            "end": 744
        },
        {
            "id": "bQBHMPmgX8w-53:46",
            "movie": "bQBHMPmgX8w",
            "name": "ときのそら",
            "title": "花時の空",
            "start": 3226,
            "end": 3563
        },
        {
            "id": "3YfI8tPsfS4-12:02",
            "movie": "3YfI8tPsfS4",
            "name": "ときのそら",
            "title": "Step and Go!!",
            "start": 722,
            "end": 980
        },
        {
            "id": "Lw3sBpkC3Rw-1:00",
            "movie": "Lw3sBpkC3Rw",
            "name": "ロボ子",
            "title": "るる",
            "start": 60,
            "end": 266
        },
        {
            "id": "Lw3sBpkC3Rw-19:50",
            "movie": "Lw3sBpkC3Rw",
            "name": "ロボ子",
            "title": "神っぽいな",
            "start": 1190,
            "end": 1400
        },
        {
            "id": "Lw3sBpkC3Rw-23:22",
            "movie": "Lw3sBpkC3Rw",
            "name": "ロボ子",
            "title": "",
            "start": 1402,
            "end": 1592
        }
    ]
}
// jsonの内容を取得
videoList = videoListJson['content']

// youtube iframe api の読み込み
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: sh/2.1,
        width: sw/2.1,
        videoId: videoList[videoIndex].movie,
        playerVars: {
            start: videoList[videoIndex].start,
            end: videoList[videoIndex].end
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

var sw = window.screen.width; // 画面の横幅
var sh = window.screen.height; // 画面の高さ

// 再生する動画のindex
var videoIndex = 0

//https://qiita.com/tkgtamagohan/items/d2e56cbfc8af460c623a
//動画再生中はfalse、次の動画の読み込み中にtrue
var done = false
// 次の動画の読み込み
function onPlayerStateChange(event){
    if (event.data==0 && !done){
        videoIndex += 1;
        done = true;
        if (videoIndex > videoList.length-1){
            videoIndex = 0
        }
        player.loadVideoById({
            videoId: videoList[videoIndex].movie,
            startSeconds:  videoList[videoIndex].start,
            endSeconds: videoList[videoIndex].end
        });
    } else if (event.data == 1 && done){
        done = false;
    }
}

// htmlの処理
// ulの取得
var movieUl = document.getElementById('movie-ul')
// templateの取得
var templateLi = document.getElementById('template-li')
// 曲のリストを表示
for (var i=0; i<videoList.length; i++){
    var newMovieLi = templateLi.content.cloneNode(true);
    // 編集
    newMovieLi.querySelector('.movieLi').id = videoList[i]['id']
    newMovieLi.querySelector('.link').addEventListener('click', test, false);
    newMovieLi.querySelector('.img').src = 'https://img.youtube.com/vi/' + videoList[i]['movie'] + '/default.jpg'
    newMovieLi.querySelector('.img').alt = videoList[i]['movie']
    newMovieLi.querySelector('.title').textContent = videoList[i]['title']
    newMovieLi.querySelector('.name').textContent = videoList[i]['name']
    // 追加
    movieUl.appendChild(newMovieLi);
}

// 指定した動画を再生
function siteVideo (num) {
    videoIndex = num
    player.loadVideoById({videoId:videoList[videoIndex].movie,
        startSeconds:videoList[videoIndex].start,
        endSeconds:videoList[videoIndex].end,
    })
}

function test () {
    console.log(i)
}


