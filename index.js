// お知らせページのお知らせ取得関数
async function loadCSVData() {
    const response = await fetch('/notice.csv');
    const text = await response.text();
    const data = text.trim().split('\n').map(line => line.split(',').map(x => x.trim()));
    var articles = "";
    for (let i = 0; i < data.length; i++) {
        articles += `
            <article style="margin-bottom:80px;">
                <h2 class="underline no-space">`+data[i][0]+`</h2>
                <p>`+data[i][1]+`</p>
            </article>
        `;
        console.log(data[i][0]+":"+data[i][1])
    }
    document.getElementById('detail').innerHTML = articles;
}


// 変数とか要素の指定
var mainContent = document.getElementById("main");
var aj = new XMLHttpRequest;
var page = "none"

var loadcontent = location.pathname.slice(1);
if (loadcontent == "") {
    loadcontent = "top"
}
else {
    loadcontent = loadcontent.slice(0, -1);
}
mainContent.innerHTML = "<p>loading...</p>";
$.ajax({
    url: "/mainContent/"+loadcontent+".html",
    dataType: "html",
    cache: false,
    success: function (res) {
        //console.log(res);
        mainContent.innerHTML = "";
        var newcontent = document.createElement("div");
        newcontent.innerHTML = res;
        mainContent.appendChild(newcontent);
        if (loadcontent == "top") {
            history.pushState("top", "開智発表会2024", "/");
        }
        else {
            history.pushState(loadcontent, "開智発表会2024", "/"+loadcontent+"/");
            if (location.pathname == "/notice/") {
                loadCSVData();
            }
        }
    },
    error: function(){
        mainContent.innerHTML = "error: 読み込みに失敗しました。再読み込みしてください。"
    }
});


// ヘッダーのaタグを無効化してAjaxを使うゴリ押し実装
$(".nav-link").click(function(event){
    event.preventDefault(); //イベントの無効化
    var loadcontent = $(this).attr("id"); //ID取得

    if (loadcontent != "constructing") {
        console.log(loadcontent);
        mainContent.innerHTML = "<p>loading...</p>";
        $.ajax({
            url: "/mainContent/"+loadcontent+".html",
            dataType: "html",
            cache: false,
            success: function (res) {
                //console.log(res);
                mainContent.innerHTML = "";
                var newcontent = document.createElement("div");
                newcontent.innerHTML = res;
                mainContent.appendChild(newcontent);
                history.pushState(loadcontent, "開智発表会2024", "/"+loadcontent+"/");
                if (location.pathname == "/notice/") {
                    loadCSVData();
                }
            },
            error: function(){
                mainContent.innerHTML = "error: 読み込みに失敗しました。再読み込みしてください。"
            }
        });
    }
    else {
        console.log("準備中...")
        alert("未確定の情報のため閲覧できません。もうしばらくお待ちください。")
    }
});


// 開智発表会の文字と左上のロゴだけはclassが異なる 多分もっといい方法ある
$(".navbar-brand").click(function(event){
    event.preventDefault(); //イベントの無効化
    var loadcontent = $(this).attr("id"); //ID取得

    console.log(loadcontent);
    mainContent.innerHTML = "<p>loading...</p>";
    $.ajax({
        url: "/mainContent/top.html",
        dataType: "html",
        cache: false,
        success: function (res) {
            //console.log(res);
            mainContent.innerHTML = "";
            var newcontent = document.createElement("div");
            newcontent.innerHTML = res;
            mainContent.appendChild(newcontent);
            history.pushState("top", "開智発表会2024", "/");
        },
        error: function(){
            mainContent.innerHTML = "error: 読み込みに失敗しました。再読み込みしてください。"
        }
    });
});



// ブラウザの戻るボタンの検知でAjax
window.addEventListener("popstate", function(e) {
    //console.log(e.state);
    if (e.state != null) {
        var loadcontent = e.state;
        console.log("back to "+loadcontent);
        mainContent.innerHTML = "<p>loading...</p>";
        $.ajax({
            url: "/mainContent/"+loadcontent+".html",
            dataType: "html",
            cache: false,
            success: function (res) {
                //console.log(res);
                mainContent.innerHTML = "";
                var newcontent = document.createElement("div");
                newcontent.innerHTML = res;
                mainContent.appendChild(newcontent);
                if (location.pathname == "/notice/") {
                    loadCSVData();
                }
            },
            error: function(){
                mainContent.innerHTML = "error: 読み込みに失敗しました。再読み込みしてください。"
            }
        });
    }
    else {
        mainContent.innerHTML = "<p>loading...</p>";
        $.ajax({
            url: "/mainContent/top.html",
            dataType: "html",
            cache: false,
            success: function (res) {
                //console.log(res);
                mainContent.innerHTML = "";
                var newcontent = document.createElement("div");
                newcontent.innerHTML = res;
                mainContent.appendChild(newcontent);
            },
            error: function(){
                mainContent.innerHTML = "error: 読み込みに失敗しました。再読み込みしてください。"
            }
        });
    }
})


// トップページのカウントダウンのプログラム
function showRestTime() {
    // トップページでないとエラーがうるさいから条件つき
    if (location.pathname == "/") {
        var time = 0;
        const now = new Date();
        var goal;
        //console.log(now);
        // 今の時間で場合分け
        if (now.getTime() < new Date(2024, 8, 14, "9", "0", "0").getTime()) {
            document.getElementById('word').textContent = "開智発表会 開催"
            goal = new Date(2024, 8, 14, "9", "0", "0");
        }
        else if (now.getTime() < new Date(2024, 8, 14, "15", "30", "0").getTime()) {
            document.getElementById('word').textContent = "開智発表会 1日目終了"
            goal = new Date(2024, 8, 14, "15", "30", "0");
        }
        else if (now.getTime() < new Date(2024, 8, 15, "9", "0", "0").getTime()) {
            document.getElementById('word').textContent = "開智発表会 2日目開始"
            goal = new Date(2024, 8, 15, "9", "0", "0");
        }
        else if (now.getTime() < new Date(2024, 8, 15, "15", "0", "0").getTime()) {
            document.getElementById('word').textContent = "開智発表会 2日目終了"
            goal = new Date(2024, 8, 15, "15", "0", "0");
        }
        else {
            // 開発が終了してたら残り時間を??にする
            document.getElementById('word').innerHTML = "第28回開智発表会は終了しました！<br>来年の開智発表会"
            document.getElementById('day').textContent = "??";
            document.getElementById('hour').textContent = "??";
            document.getElementById('minute').textContent = "??";
            document.getElementById('second').textContent = "??";
            time = 1;
        }

        // まだ開発が終了してなかったら必要な数字を入れる
        if (time == 0) {
            const restMillisecond = goal.getTime() - now.getTime();
            const day = Math.floor(restMillisecond / 1000 / 60 / 60 / 24);
            const hour = Math.floor(restMillisecond / 1000 / 60 / 60) % 24;
            const minute = Math.floor(restMillisecond / 1000 / 60) % 60;
            const second = Math.floor(restMillisecond / 1000) % 60;

            document.getElementById('day').textContent = day;
            document.getElementById('hour').textContent = hour;
            document.getElementById('minute').textContent = String(minute).padStart(2, '0');
            document.getElementById('second').textContent = String(second).padStart(2, '0');
        }
    }
}
setInterval(showRestTime, 1000);
