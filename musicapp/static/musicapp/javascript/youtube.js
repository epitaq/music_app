// Djangoからdataを取得
videoList = JSON.parse(document.getElementById('data').textContent)
// もし一個も見つからなかったら
if (videoList.length == 0){
    videoList = [
        {
            "id": "none",
            "movie": "none",
            "name": "epita",
            "title": "見つかりません",
            "start": 0,
            "end": 0
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
        height: document.getElementById('player').clientHeight-32,
        width: document.getElementById('player').clientWidth-32,
        videoId: videoList[videoIndex].movie,
        playerVars: {
            start: videoList[videoIndex].start,
            end: videoList[videoIndex].end,
            fs: 0,
            controls: 0,
        },
        events: {
            onStateChange: onPlayerStateChange, 
            onReady: htmlVideoList,
            onError: skipVideo,
        }
    });
}


// 再生する動画のindex
var videoIndex = 0

//https://qiita.com/tkgtamagohan/items/d2e56cbfc8af460c623a
// 現在の再生状況 1: 再生中  0:停止中
var playStatus = 0
//動画再生中はfalse、次の動画の読み込み中にtrue
var done = false
// 次の動画の読み込み、再生ステータスの変更で矢印マークの変更
function onPlayerStateChange(event){
    // console.log('onPlayerStateChange : '+event.data)
    if (event.data==1){
        document.getElementById('playArrow').src = '/static/musicapp/images/pause_white_24dp.svg'
        playStatus = 1
        // 時間管理スライダーを移動
        changeTimeSlider()
    } else {
        document.getElementById('playArrow').src = '/static/musicapp/images/play_arrow_white_24dp.svg'
        playStatus = 0
    }
    if (event.data==0 && !done){
        videoIndex += 1;
        done = true;
        if (videoIndex >= videoList.length){
            if (repeat){
                videoIndex = 0
                videoListShuffle()
            } else {
                return 0
            }
        }
        specifiedVideos(videoIndex)
    } else if (event.data == 1 && done){
        done = false;
    }
}


// 指定した動画を再生
function specifiedVideos (num) {
    // コントロール中央を表示
    information ()
    // 時間スライダーを0
    document.getElementById('timeSlider').value = 0
    // 動画をロード
    player.loadVideoById({
        videoId:videoList[num].movie,
        startSeconds:videoList[num].start,
        endSeconds:videoList[num].end,
    })
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
    for (var i=0; i<videoList.length; i+= 1){
        var newMovieLi = templateLi.content.cloneNode(true);
        // 編集
        newMovieLi.querySelector('.movieLi').id = videoList[i]['id']
        newMovieLi.querySelector('.link').addEventListener('click', {index:i ,handleEvent:function(){videoIndex = this.index;specifiedVideos(videoIndex)}}, false);
        newMovieLi.querySelector('.img').src = 'https://img.youtube.com/vi/' + videoList[i]['movie'] + '/default.jpg'
        newMovieLi.querySelector('.img').alt = videoList[i]['movie']
        newMovieLi.querySelector('.title').textContent = videoList[i]['title']
        newMovieLi.querySelector('.name').textContent = videoList[i]['name']
        // 追加
        movieUl.appendChild(newMovieLi);
    }
    // コントロール中央に情報を表示
    information()
}


// 時間管理のスライダー 指定時間に飛ぶ
document.getElementById('timeSlider').addEventListener('input', changeTime);
function changeTime () {
    var nowTime = document.getElementById('timeSlider').value
    seekTime = (videoList[videoIndex].end - videoList[videoIndex].start) * nowTime + videoList[videoIndex].start
    player.seekTo(seekTime, allowSeekAhead=true)
}
// 時間管理スライダーを変更
function changeTimeSlider() {
    var nowTime = (player.getCurrentTime() - videoList[videoIndex].start) / (videoList[videoIndex].end - videoList[videoIndex].start)
    // console.log(nowTime)
    document.getElementById('timeSlider').value = nowTime
    setTimeout(changeTimeSlider, 100)
}


// 開始停止ボタン
function playArrow(){
    if (playStatus == 1){
        player.pauseVideo()
    } else if (playStatus == 0) {
        player.playVideo()
    }
}
// スキップボタン
function skipVideo () {
    if (playStatus == 1){
        videoIndex += 1
        specifiedVideos(videoIndex)
    } else {
        videoIndex += 1
        specifiedVideos(videoIndex)
        setTimeout(function(){player.pauseVideo()},300)
    }
}
// 戻るボタン
function restoreVideo () {
    if (playStatus == 1){
        videoIndex -= 1
        specifiedVideos(videoIndex)
    } else {
        videoIndex -= 1
        specifiedVideos(videoIndex)
        setTimeout(function(){player.pauseVideo()},300)
    }
}


// 動画タイトルの表示、コントロール
function information () {
    var info = document.getElementById('information')
    info.innerHTML = ''
    var template = document.getElementById('templateInfo')
    var newInfo = template.content.cloneNode(true);
    // 編集
    newInfo.querySelector('.title').textContent = videoList[videoIndex]['title']
    newInfo.querySelector('.name').textContent = videoList[videoIndex]['name']
    // 追加
    info.appendChild(newInfo);
    // タイトルの変更
    document.title = videoList[videoIndex]['title']
}


// 最後の音量
// クッキーから取得
if (document.cookie.split('=')[0] == 'volume'){
    var lastVolume = document.cookie.split('=')[1]-0
    document.getElementById('volumeSlider').value = lastVolume
} else {
    var lastVolume = 100
}
setTimeout(function(){player.setVolume(lastVolume)}, 1000)
// player.setVolume(volume)
// ミュートの判定
var mute = false
// ミュート
function changeMute (){
    mute = !mute
    if (mute){
        lastVolume = player.getVolume()
        volume = document.getElementById('volumeSlider').value = 0
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
    // console.log('changeVolume : ' + volume)
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
// document.getElementById('repeatButton').style.opacity = 0.5;  
// ループをするしないの反転
function changeRepeat () {
    repeat = !repeat
    console.log(repeat)
    if (repeat){
        document.getElementById('repeatButton').style.opacity = 1;  
    } else {
        document.getElementById('repeatButton').style.opacity = 0.5;  
    }
}


// シャッフル用
function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i-= 1){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
    return arr
}
// videoList をシャッフル
function videoListShuffle (){
    videoList = fisherYatesShuffle(videoList)
    videoIndex = 0
    // 動画を更新
    if (playStatus == 1){
        specifiedVideos(videoIndex)
    } else {
        specifiedVideos(videoIndex)
        setTimeout(function(){player.pauseVideo()},300)
    }
    // htmlを変更
    htmlVideoList()
}


// 再生速度
// document.getElementById('PlaybackRate').addEventListener('change', changePlaybackRate)
// function changePlaybackRate () {
//     var playbackRate = document.getElementById('PlaybackRate').value - 0
//     player.setPlaybackRate(suggestedRate=playbackRate)
// }
