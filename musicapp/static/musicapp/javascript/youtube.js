// Djangoからdataを取得
videoList = JSON.parse(document.getElementById('data').textContent)
// もし一個も見つからなかったら
if (videoList.length == 0){
    videoList = [
        {
            "id": "epita",
            "movie": "epita",
            "name": "epita",
            "title": "見つかりません",
            "start": 0,
            "end": 0,
        },
    ]
}


// youtube iframe api
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: document.getElementById('primary').clientHeight-32,
        width: document.getElementById('primary').clientWidth-32,
        videoId: videoList[videoIndex].movie,
        playerVars: {
            start: videoList[videoIndex].start,
            end: videoList[videoIndex].end,
            fs: 0,
            controls: 0,
        },
        events: {
            onStateChange: onPlayerStateChange,
            onReady: createHtmlMusicList,
            onError: skipVideo,
        }
    });
}


// videoListを変更するたびに更新する
// 基本的には今の動画のvideoListでのインデックスを保存する
var videoIndex = 0

// 現在の再生状況 1: 再生中  0:停止中
var playStatus = 0
//
var loadDone = false

function onPlayerStateChange (event){
    // 再生ボタンの形 playStatusここでのみ変更
    if (event.data == 1){
        document.getElementById('playArrow').src = '/static/musicapp/images/pause_white_24dp.svg'
        playStatus = 1
    } else {
        document.getElementById('playArrow').src = '/static/musicapp/images/play_arrow_white_24dp.svg'
        playStatus = 0
    }
    // 次の動画を読み込み
    // 参考
    //https://qiita.com/tkgtamagohan/items/d2e56cbfc8af460c623a
    if (event.data==0 && !loadDone) {
        videoIndex += 1
        loadDone = true
        if (videoIndex >= videoList.length) {
            videoIndex -= 1
            if (repeat) {
                videoListShuffle()
            } else {
                return 0
            }
        }
        // 次の動画を読み込み
        specifiedVideos(videoIndex)
    } else if (event.data==1 && loadDone) {
        loadDone = false
    }
    //
    // スライダーを起動
    changeTimeSlider()
}


// 指定した動画を再生
function specifiedVideos (num) {
    // シャッフルの判定
    if (shuffleDone){
        num = 0
        videoIndex = 0
        shuffleDone = false
    }
    // コントロール
    information ()
    // 時間スライダー
    document.getElementById('timeSlider').value = 0
    // 動画をロード
    player.loadVideoById({
        videoId : videoList[num].movie,
        startSeconds : videoList[num].start,
        endSeconds : videoList[num].end,
    })
    // 再生されている動画を強調
    // var movieUlCh =  document.getElementById('movie-ul').childNodes
    for (var i=0; i < videoList.length; i++){
        if (videoIndex == i){
            document.getElementById(videoList[i].id).style = 'background-color: rgb(255,255,255,0.5);'
        } else {
            document.getElementById(videoList[i].id).style = ''
        }
    }
}


// ミュージックリストのhtmlを変更
function createHtmlMusicList () {
    // ulの取得
    var movieUl = document.getElementById('movie-ul')
    // templateの取得
    var templateLi = document.getElementById('template-li')
    // ulの初期化
    movieUl.innerHTML = ''
    // 曲のリストを表示
    for (var i=0; i<videoList.length; i+= 1){
        var newMovieLi = templateLi.content.cloneNode(true);
        // 編集
        newMovieLi.querySelector('.movieLi').id = videoList[i]['id']
        newMovieLi.querySelector('.movieLi').addEventListener('click', {index:i ,handleEvent:function(){videoIndex = this.index;specifiedVideos(videoIndex)}}, false);
        newMovieLi.querySelector('.img').src = 'https://img.youtube.com/vi/' + videoList[i]['movie'] + '/default.jpg'
        newMovieLi.querySelector('.img').alt = videoList[i]['movie']
        newMovieLi.querySelector('.title').textContent = videoList[i]['title']
        newMovieLi.querySelector('.name').textContent = videoList[i]['name']
        // 追加
        movieUl.appendChild(newMovieLi);
    }
    // コントロール
    information()
}


// 時間管理のスライダー 指定時間に飛ぶ
document.getElementById('timeSlider').addEventListener('input', changeTime);
function changeTime () {
    videoMax = videoList[videoIndex].end
    if (videoMax == -1){
        videoMax = player.getDuration()
    }
    var nowTime = document.getElementById('timeSlider').value
    seekTime = (videoMax - videoList[videoIndex].start) * nowTime + videoList[videoIndex].start
    player.seekTo(seekTime, allowSeekAhead=true)
}
// 時間用の0を追加
function addZero (num) {
    if (num < 10){
        return '0'+num
    } else {
        return num+''
    }
}
// 時間管理スライダーを変更
function changeTimeSlider() {
    videoMax = videoList[videoIndex].end
    if (videoMax == -1){
        videoMax = player.getDuration()
    }
    var nowTime = (player.getCurrentTime() - videoList[videoIndex].start) / (videoMax - videoList[videoIndex].start)
    // スライダーの変更
    document.getElementById('timeSlider').value = nowTime
    // デジタルタイマーの変更
    // 全体の時間
    var videoMin = addZero(Math.floor((videoMax - videoList[videoIndex].start)/60)) // 分の作成
    var videoSec = addZero(Math.floor((videoMax - videoList[videoIndex].start) - videoMin*60)) // 秒の作成
    // 今の時間
    var nowMin = addZero(Math.floor((player.getCurrentTime()- videoList[videoIndex].start) / 60)) // 分の作成
    var nowSec = addZero(Math.floor((player.getCurrentTime()- videoList[videoIndex].start) - nowMin*60)) // 秒の作成
    // 表示
    document.getElementById('digitalTimer').innerHTML = nowMin + ':' + nowSec + '/' + videoMin + ':' + videoSec
    // playStatusによって動作の終了
    if (playStatus == 1){
        setTimeout(changeTimeSlider, 500)
    } else {
        return 0
    }
}



// 開始停止ボタン
// playStatusを参照
function playArrow(){
    if (playStatus == 1){
        player.pauseVideo()
    } else if (playStatus == 0) {
        player.playVideo()
    }
}
// スキップボタン
function skipVideo () {
    if (videoIndex+1 >= videoList.length){
        videoIndex = 0
    } else {
        videoIndex += 1
    }
    if (playStatus == 1){
        specifiedVideos(videoIndex)
    } else {
        specifiedVideos(videoIndex)
        // 遅延を無くした
        player.pauseVideo()
    }
}
// 戻るボタン
function restoreVideo () {
    // videoIndexがマイナスになることを考える 最後に飛ぶ
    if (videoIndex < 1){
        videoIndex = videoList.length - 1
    }
    if (playStatus == 1){
        specifiedVideos(videoIndex)
    } else {
        specifiedVideos(videoIndex)
        // 遅延を無くした
        player.pauseVideo()
    }
}


// 動画タイトルの表示、コントロール
function information () {
    // htmlの書き換え
    document.getElementById('controlTitle').innerHTML = videoList[videoIndex].title
    document.getElementById('controlName').innerHTML = videoList[videoIndex].name
    // タイトルの変更
    document.title = 'epita | ' + videoList[videoIndex]['title']
}

// 音量スライダーの非表示
document.getElementById('volume').addEventListener('mouseenter',() => {
    document.getElementById('volumeSlider').style.display = ''
})
document.getElementById('volume').addEventListener('mouseleave',() => {
    setTimeout(() => {
        document.getElementById('volumeSlider').style.display = 'none'
    }, 500);
})
// 音量のデータ
var lastVolume = 100
// クッキーから取得
var cook = document.cookie.split(';')
for (var i=0; i<cook.length;i++){
    if (cook[i].split('=')[0] == ' volume'){
        var lastVolume = cook[i].split('=')[1]
        document.getElementById('volumeSlider').value = lastVolume
    }
}
// 遅延がないとAPIの読み込みの前に実行される
setTimeout(function(){player.setVolume(lastVolume)}, 1000)
// ミュートの判定
var mute = false
// ミュート
function changeMute (){
    mute = !mute
    if (mute){
        lastVolume = player.getVolume()
        // なんでこれ？
        // volume = document.getElementById('volumeSlider').value = 0
        document.getElementById('volumeSlider').value = 0
        player.mute()
        document.getElementById('volumeButton').src = '/static/musicapp/images/volume_off_white_24dp.svg'
    } else {
        player.unMute()
        document.getElementById('volumeButton').src = '/static/musicapp/images/volume_up_white_24dp.svg'
        player.setVolume(lastVolume)
        document.getElementById('volumeSlider').value = lastVolume
    }
}
// 音量スライダーの変更
document.getElementById('volumeSlider').addEventListener('input', changeVolume);
function changeVolume () {
    var volume = document.getElementById('volumeSlider').value
    if (volume == 0 & !mute){
        changeMute()
    } else if (mute){
        changeMute()
        player.setVolume(volume)
    } else {
        player.setVolume(volume)
    }
    // 音量をクッキーに保存 10min
    document.cookie = "volume=" + volume + ";max-age=86400"
}


// ループするのかの指定 true or false
var repeat = true
// ループをするしないの反転
function changeRepeat () {
    repeat = !repeat
    if (repeat){
        document.getElementById('repeatButton').style.opacity = 1;
    } else {
        document.getElementById('repeatButton').style.opacity = 0.5;
    }
}


// シャッフル
function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i-= 1){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
    return arr
}
// シャッフル後のインデックスを0にする
var shuffleDone = false
function videoListShuffle () {
    // シャッフル後のインデックスを0にする
    shuffleDone = true
    // 以前のIDを保存
    var previousId = videoList[videoIndex].id
    // videoListをシャッフル
    videoList = fisherYatesShuffle(videoList)
    // 今の動画の新しいインデックスを取得
    for (var i=0; i<videoList.length; i++) {
        if (previousId == videoList[i].id){
            videoIndex = i
        }
    }
    // htmlの変更
    createHtmlMusicList()
}


// ウィンドウサイズが変わったら動画サイズも変更
window.addEventListener('resize', function () {
    player.setSize(width=document.getElementById('primary').clientWidth-32,
                    height=document.getElementById('primary').clientHeight-32)
})