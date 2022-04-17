// youtube iframe api
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        width: document.getElementById('primary').clientWidth-32,
        videoId: '',
        playerVars: {
            fs: 0,
            controls: 1,
        },
        events: {
        }
    });
}


// 離れる時に警告
window.onbeforeunload = function(e) {
    e.returnValue = "ページを離れようとしています。よろしいですか？";
}


// メインのデータ open先でも使いたいからVARにしている
var musicData = []

// htmlから動画IDと歌った人を取得
let videoId = ''
let singer = ''

// videoIdの変更で動画を変更 & 入力欄のmovieを自動入力
document.getElementById('videoId').addEventListener('change', videoIdChange)
function videoIdChange(){
    videoId = document.getElementById('videoId').value
    player.cueVideoById({
        videoId : videoId,
    })
    // 自動入力
    document.getElementById('inputMovie').value = videoId
}
// 入力欄のnameを自動入力
document.getElementById('singer').addEventListener('change', singerChange)
function singerChange(){
    singer = document.getElementById('singer').value
    document.getElementById('inputName').value = singer
}


// 時間用の0を追加
function addZero (num) {
    if (num < 10){
        return '0'+num
    } else {
        return num+''
    }
}

// musicDataを元にhtmlを作成
function createTable(){
    const movieTable = document.querySelector("#movieData > tbody")
    movieTable.innerHTML = '<tr><th>movie</th><th>name</th><th>title</th><th>start</th><th>end</th></tr>'
    let count = 0 // id用の通し番号
    musicData.forEach((music) => {
        const tr = document.createElement('tr')
        movieTable.appendChild(tr)
        // 中の内容
        const obArray = Object.entries(music)
        obArray.forEach((arr) =>{
            const td = document.createElement('td')
            // startとendの時秒数をmm：ssに変更
            if (arr[0] == 'start' || arr[0] == 'end'){
                let videoMin = addZero(Math.floor(arr[1] /60)) // 分の作成
                let videoSec = addZero(Math.floor(arr[1]  - videoMin*60)) // 秒の作成
                td.textContent = videoMin + ':' + videoSec
            } else {
                td.textContent = arr[1] // arrのキーを抜いた部分
            }
            let id = count + arr[0] // 要素のid
            td.id = id
            td.addEventListener('dblclick', {id:id, count:count, type:arr[0], handleEvent:changeInput}, {once: true})
            tr.appendChild(td)
        })
        count++
    })
}
// クリックされたら入力欄に変更
function changeInput(){
    let input = document.createElement('input')
    let original = document.getElementById(this.id)
    let originalValue = original.innerHTML // 元の値を
    original.innerHTML = '' // 元の中身を初期化
    input.value = originalValue //inputに元の値を入れる
    input.style.width = '100%'
    // フォーカスが外れたら元に戻す
    input.addEventListener('blur', () => {
        musicData[this.count][this.type] = input.value
        // テーブルを再描画
        createTable()
    })
    original.appendChild(input)
    input.focus()
}


// 記入欄の取得 ボタン
function getData () {
    // データの取得
    let movieData = document.getElementById('inputMovie').value
    let nameData = document.getElementById('inputName').value
    let titleData = document.getElementById('inputTitle').value
    let startData = document.getElementById('inputStart').value
    let endData = document.getElementById('inputEnd').value
    // 中身がある時
    if (movieData!='' && nameData!='' && titleData!='' && startData!='' && endData!=''){
        // データの登録
        musicData.push({
            movie : movieData,
            name : nameData,
            title : titleData,
            start : startData,
            end : endData,
        })
        // 記入欄の初期化
        document.getElementById('inputMovie').value = videoId
        document.getElementById('inputName').value = singer
        document.getElementById('inputTitle').value = ''
        document.getElementById('inputStart').value = ''
        document.getElementById('inputEnd').value = ''
        createTable()
    }
}


// データのインポート
const profile_form = document.getElementById('upData')
profile_form.addEventListener("change", (e) => {
    var profile = e.target.files[0]
    var filename = profile.name
    var type = profile.type
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var reader = new FileReader()
        reader.readAsText(profile)
        reader.onload = (file) => {
        if (type == "application/json") {
            musicData = JSON.parse(file.target.result)
            createTable() // テーブルに反映
            singer = musicData[0].name
            document.getElementById('singer').value = singer
            videoId =  musicData[0].movie
            document.getElementById('videoId').value = videoId
            // playerとdataに反映
            videoIdChange()
            singerChange()
        } else {
        }
        }
    }
}, false)
// データのエクスポート
function dataExport() {
    // JSON.stringifyで文字列に変換
    const blob = new Blob([JSON.stringify(musicData, null, '  ')], {
        type: 'application/json',
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = videoId + '.json' // 出力するファイルの名前
    link.click()
    link.remove()
}


// 時間を保存
function saveStart (){
    let time = Math.floor(player.getCurrentTime())
    document.getElementById('inputStart').value = time
}
function saveEnd (){
    let time = Math.floor(player.getCurrentTime())
    document.getElementById('inputEnd').value = time
}


// 作成したデータを確認
// データはopenerから取得される
function checkVideo () {
    window.open('/musicapp/player/')
}


// スキップスライダー
document.getElementById('skipRange').addEventListener('change',() => {
    let current = player.getCurrentTime()
    let skip = document.getElementById('skipRange').value - 0
    player.seekTo(seconds=current+skip, allowSeekAhead=true)
    document.getElementById('skipRange').value = 0
})


// ウィンドウサイズが変わったら動画サイズも変更
window.addEventListener('resize', function () {
    player.setSize(width=document.getElementById('primary').clientWidth-32,
                    (height=document.getElementById('primary').clientWidth-32)*(3/4))
})
