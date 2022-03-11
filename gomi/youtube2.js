videoJson ={
    "contents": [
        {
            "id": "M7lc1UVf-VE",
            "movie": "M7lc1UVf-VE",
            "start": "10",
            "end": "14"
        },
        {
            "id": "68KV7JnrvDo",
            "movie": "68KV7JnrvDo",
            "start": "2",
            "end": "5"
        },
        {
            "id": "glbYC6rBn3g",
            "movie": "glbYC6rBn3g",
            "start": "4",
            "end": "6"
        }
    ],
    "videoList": [
        "M7lc1UVf-VE",
        "68KV7JnrvDo",
        "glbYC6rBn3g"
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

// 動画のリストをhtmlに作成
var vList = videoJson['videoList'] ;
var movieUl = document.getElementById('movie-ul');
var templateLi = document.getElementById('template-li');

for (var i=0; i<vList.length; i++){
    var newMovieLi = templateLi.content.cloneNode(true);
    // 編集
    newMovieLi.querySelector('.movieLi').id = videoList[i]['id']
    newMovieLi.querySelector('.url').href = 'https://youtu.be/' + videoList[i]['movie']
    newMovieLi.querySelector('.img').src = 'https://img.youtube.com/vi/' + videoList[i]['movie'] + '/default.jpg'
    newMovieLi.querySelector('.img').alt = videoList[i]['movie']
    newMovieLi.querySelector('.title').textContent = 'title:' + videoList[i]['id']
    newMovieLi.querySelector('.name').textContent = 'name:' + videoList[i]['id']
    // 追加
    movieUl.appendChild(newMovieLi);
}
