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
            "title": "フォイニ",
            "start": 1402,
            "end": 1592
        },
        {
            "id": "Cv_2tjVo-p4-5:07",
            "movie": "Cv_2tjVo-p4",
            "name": "さくらみこ",
            "title": "どぅーまいべすと！",
            "start": 307,
            "end": 577
        },
        {
            "id": "Cv_2tjVo-p5-9:40",
            "movie": "Cv_2tjVo-p5",
            "name": "さくらみこ",
            "title": "Booo！",
            "start": 580,
            "end": 756
        },
        {
            "id": "Cv_2tjVo-p6-13:53",
            "movie": "Cv_2tjVo-p6",
            "name": "さくらみこ＆大神ミオ＆大空スバル",
            "title": "神のまにまに",
            "start": 833,
            "end": 1088
        },
        {
            "id": "Cv_2tjVo-p7-18:15",
            "movie": "Cv_2tjVo-p7",
            "name": "さくらみこ＆白銀ノエル",
            "title": "寝・逃・げでリセット！",
            "start": 1095,
            "end": 1367
        },
        {
            "id": "Cv_2tjVo-p8-22:54",
            "movie": "Cv_2tjVo-p8",
            "name": "さくらみこ＆不知火フレア",
            "title": "ライアーダンス",
            "start": 1374,
            "end": 1594
        },
        {
            "id": "Cv_2tjVo-p9-26:33",
            "movie": "Cv_2tjVo-p9",
            "name": "さくらみこ＆不知火フレア& 尾丸ポルカ",
            "title": "トンデモワンダーズ",
            "start": 1593,
            "end": 1790
        },
        {
            "id": "Cv_2tjVo-p10-29:56",
            "movie": "Cv_2tjVo-p10",
            "name": "さくらみこ＆宝鐘マリン",
            "title": "Catch You Catch Me",
            "start": 1796,
            "end": 2021
        },
        {
            "id": "Cv_2tjVo-p10-33:51",
            "movie": "Cv_2tjVo-p10",
            "name": "さくらみこ＆星街すいせい",
            "title": "約束の絆",
            "start": 2031,
            "end": 2300
        },
        {
            "id": "Cv_2tjVo-p11-44:45",
            "movie": "Cv_2tjVo-p11",
            "name": "さくらみこ",
            "title": "Happy Strawberry",
            "start": 2685,
            "end": 2915
        },
        {
            "id": "Cv_2tjVo-p12-48:40",
            "movie": "Cv_2tjVo-p12",
            "name": "さくらみこ",
            "title": "惑星ループ",
            "start": 2920,
            "end": 3132
        },
        {
            "id": "Cv_2tjVo-p13-56:38",
            "movie": "Cv_2tjVo-p13",
            "name": "さくらみこ",
            "title": "ファンサ",
            "start": 3398,
            "end": 3648
        },
        {
            "id": "Cv_2tjVo-p14-1:00:57",
            "movie": "Cv_2tjVo-p14",
            "name": "さくらみこ",
            "title": "さくらかぜ",
            "start": 3657,
            "end": 3885
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
        height: document.getElementById('player').clientHeight,//window.screen.height/2,
        width: document.getElementById('player').clientWidth,//window.screen.width/2,
        videoId: videoList[videoIndex].movie,
        playerVars: {
            start: videoList[videoIndex].start,
            end: videoList[videoIndex].end
        },
        events: {
            'onStateChange': onPlayerStateChange,
            'onReady': htmlVideoList
        }
    });
}

// var sw = window.screen.width; // 画面の横幅
// var sh = window.screen.height; // 画面の高さ

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

// htmlに動画リストを表示
function htmlVideoList () {
    // htmlの処理
    // ulの取得
    var movieUl = document.getElementById('movie-ul')
    // templateの取得
    var templateLi = document.getElementById('template-li')
    // ulの初期化
    movieUl.innerHTML = ''
    // 曲のリストを表示
    for (var i=0; i<videoList.length; i++){
        var newMovieLi = templateLi.content.cloneNode(true);
        // 編集
        newMovieLi.querySelector('.movieLi').id = videoList[i]['id']
        newMovieLi.querySelector('.link').addEventListener('click', {index:i ,handleEvent:siteVideo}, false);
        newMovieLi.querySelector('.img').src = 'https://img.youtube.com/vi/' + videoList[i]['movie'] + '/default.jpg'
        newMovieLi.querySelector('.img').alt = videoList[i]['movie']
        newMovieLi.querySelector('.title').textContent = videoList[i]['title']
        newMovieLi.querySelector('.name').textContent = videoList[i]['name']
        // 追加
        movieUl.appendChild(newMovieLi);
    }
}

// 指定した動画を再生
function siteVideo (num) {
    videoIndex = this.index
    player.loadVideoById({videoId:videoList[videoIndex].movie,
        startSeconds:videoList[videoIndex].start,
        endSeconds:videoList[videoIndex].end,
    })
}

// シャッフル用
function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
    return arr
}
// videoList をシャッフル
function videoListShuffle (){
    videoList = fisherYatesShuffle(videoList)
    console.log(videoList)
    htmlVideoList()
}

