

// youtube iframe api
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'RDHf9Tmdvpk',
        playerVars: {
            fs: 0,
            controls: 1,
        },
        events: {
            onReady : () => {
                // テスト用
                let videoId = 'RDHf9Tmdvpk'
                let singer = '星街すいせい'
                document.getElementById('videoId').value = videoId
                document.getElementById('inputMovie').value = videoId
                document.getElementById('singer').value = singer
                document.getElementById('inputName').value = singer
            }
        }
    });
}

// 編集中のvideoId
let videoId = ''
// videoIdを元に動画をロード
document.getElementById('videoId').addEventListener('change', () =>{
    videoId = document.getElementById('videoId').value
    player.cueVideoById({
        videoId : videoId,
    })
})


// メインのデータ
let musicData = []
// objectsを元にtableを作成
function createTable(){
    const movieData = document.querySelector("#movieData > tbody")
    movieData.innerHTML = '<tr><th>movie</th><th>name</th><th>title</th><th>start</th><th>end</th></tr>'
    musicData.forEach((music) =>{
        const tr = document.createElement('tr')
        movieData.appendChild(tr)
        // 1行の中を生成
        const obArray = Object.entries(music)
        obArray.forEach((arr) => {
            const td = document.createElement('td')
            td.textContent = arr[1] // arr[1]はvalueの部分
            tr.appendChild(td)
        })
    })
}


// 名前を保存
let singer = ''
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

