// youtube iframe api
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: '',
        playerVars: {
            fs: 0,
            controls: 1,
        },
        events: {
            // onReady : () => {
            //     document.getElementById('videoId').value = videoId
            //     document.getElementById('inputMovie').value = videoId
            //     document.getElementById('singer').value = singer
            //     document.getElementById('inputName').value = singer
            // }
        }
    });
}


// videoIdを元に動画をロード
document.getElementById('videoId').addEventListener('change', () =>{
    videoId = document.getElementById('videoId').value
    player.cueVideoById({
        videoId : videoId,
    })
})


// メインのデータ open先でも使いたいからVARにしている
var musicData = []

// objectsを元にtableを作成
function createTable(){
    const movieData = document.querySelector("#movieData > tbody")
    movieData.innerHTML = '<tr><th>movie</th><th>name</th><th>title</th><th>start</th><th>end</th></tr>'
    let co = 0
    musicData.forEach((music) =>{
        const tr = document.createElement('tr')
        movieData.appendChild(tr)
        // 1行の中を生成
        const obArray = Object.entries(music)
        obArray.forEach((arr) => {
            const td = document.createElement('td')
            td.textContent = arr[1] // arr[1]はvalueの部分
            let id = co + arr[0]
            td.id = id
            td.addEventListener('dblclick', {id:id,co:co, ty:arr[0], handleEvent:createInput},{once: true})
            tr.appendChild(td)
        })
        co ++
    })
}
function createInput(){
    console.log(this.id)
    console.log(this.co)
    let input = document.createElement('input')
    let moto = document.getElementById(this.id).innerHTML
    document.getElementById(this.id).innerHTML = ''
    input.id = this.id + 'input'
    input.value = moto
    input.addEventListener('blur',()=>{
        musicData[this.co][this.ty] = input.value
        console.log('でた')
        createTable()
    })
    document.getElementById(this.id).appendChild(input)
    input.focus()
}


// 名前を保存
// 編集中のvideoId
let singer = ''
let videoId = ''

// テスト用
// let videoId = 'RDHf9Tmdvpk'
// let singer = '星街すいせい'
// 初期値の入力
document.getElementById('videoId').addEventListener('change', () =>{
    document.getElementById('inputMovie').value = videoId
})
document.getElementById('singer').addEventListener('change', () =>{
    singer = document.getElementById('singer').value
    document.getElementById('inputName').value = singer
})
// データの取得 ボタン
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

// 時間を保存
function saveStart (){
    let time = Math.floor(player.getCurrentTime())
    document.getElementById('inputStart').value = time
}
function saveEnd (){
    let time = Math.floor(player.getCurrentTime())
    document.getElementById('inputEnd').value = time
}

// 保存
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

// 離れる時に警告
window.onbeforeunload = function(e) {
    e.returnValue = "ページを離れようとしています。よろしいですか？";
}

// データをアップロード
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
        } else {
        }
        }
    }
}, false)

function checkVideo () {
    window.open('/musicapp/player/')
}