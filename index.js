// なんかいい感じに待ち時間を作る関数
function sleepSetTimeout(ms, callback) {
    setTimeout(callback, ms);
}

// お知らせページのお知らせ取得関数
async function loadCSVData() {
    const response = await fetch('./notice.csv');
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

// Queryの処理 もうちょっと綺麗に書きたいね
var queryStr = window.location.search.slice(1);
var queries = {};
// Queryがないときにundefinedにならないように
if (!queryStr) {
    // リンク置き換え & Ajax
    history.replaceState('', "トップ - 開智発表会2024", "./index.html?p=top");
    aj.open("GET", "./mainContent/top.html");
    aj.send();
    aj.onreadystatechange = function() {
        if (aj.status === 200 && aj.readyState === 4) {
            //console.log(aj.responseText);
            mainContent.innerHTML = aj.responseText;
            page = "top";
        }
    }
}
else {
    // Queryを辞書に格納
    queryStr.split('&').forEach(function(queryStr) {
        // = で分割してkey,valueを格納
        var queryArr = queryStr.split('=');
        queries[queryArr[0]] = queryArr[1];
    });
    //console.log(queries.p);
    // ここからAjax、もう慣れたね(コピペ)
    aj.open("GET", "./mainContent/"+queries.p+".html");
    aj.send();
    aj.onreadystatechange = function() {
        if (aj.status === 200 && aj.readyState === 4) {
            //console.log(aj.responseText);
            mainContent.innerHTML = aj.responseText;
            page = queries.p;
            if (page == "notice") {
                loadCSVData();
            }
        }
    }
}


// ヘッダーのaタグを無効化してAjaxを使うゴリ押し実装
$(".nav-link").click(function(event){
    event.preventDefault(); //イベントの無効化
    var loadcontent = $(this).attr("id"); //ID取得

    if (loadcontent != "constructing") {
        console.log(loadcontent);
        // ここからAjax
        var aj = new XMLHttpRequest;
        aj.open("GET", "./mainContent/"+loadcontent+".html");
        aj.send();
        aj.onreadystatechange = function() {
            if (aj.status === 200 && aj.readyState === 4) {
                //console.log(aj.responseText);
                mainContent.innerHTML = aj.responseText;
                history.pushState(loadcontent, "開智発表会2024", "./index.html?p="+loadcontent);
                scrollTo(0, 0);
                page = loadcontent;
                if (page == "notice") {
                    loadCSVData();
                }
            }
        }
    }
    else {
        console.log("建設中...")
        alert("このページは準備中です。")
    }
});

// 開智発表会の文字と左上のロゴだけはclassが異なる 多分もっといい方法ある
$(".navbar-brand").click(function(event){
    event.preventDefault();
    var aj = new XMLHttpRequest;
    aj.open("GET", "./mainContent/top.html");
    aj.send();
    aj.onreadystatechange = function() {
        if (aj.status === 200 && aj.readyState === 4) {
            //console.log(aj.responseText);
            mainContent.innerHTML = aj.responseText;
            history.pushState("top", "開智発表会2024", "./index.html?p=top");
            scrollTo(0, 0);
            page = "top";
        }
    }
});



// ブラウザの戻るボタンの検知でAjax
window.addEventListener("popstate", function(e) {
    //console.log(e.state);
    if (e.state != null) {
        console.log("back to "+e.state);
        aj.open("GET", "./mainContent/"+e.state+".html");
        aj.send();
        aj.onreadystatechange = function() {
            if (aj.status === 200 && aj.readyState === 4) {
                //console.log(aj.responseText);
                mainContent.innerHTML = aj.responseText;
                page = e.state;
                if (page == "notice") {
                    loadCSVData();
                }
            }
        }
    }
    else {
        aj.open("GET", "./mainContent/top.html");
        aj.send();
        aj.onreadystatechange = function() {
            if (aj.status === 200 && aj.readyState === 4) {
                //console.log(aj.responseText);
                mainContent.innerHTML = aj.responseText;
                page = "top"
            }
        }
    }
})

// スクロールを検知してヘッダーをなんかいい感じにするやつ 結局つかわない
/*
$(window).scroll(function () {
    //console.log($(this).scrollTop());
    if ($(this).scrollTop() >= 100) {
        $('header').fadeIn();
    } else {
        $('header').fadeOut();
    }
});
*/

// ページを開いた時のアニメーション
$(function(){
    sleepSetTimeout(1000, () => $(".title").animate({opacity: 0,}, 1000));
    sleepSetTimeout(2000, () => $(".title").remove())
});


// トップページのカウントダウンのプログラム
function showRestTime() {
    // トップページでないとエラーがうるさいから条件つき
    if (page == "top") {
        var time = 0;
        const now = new Date();
        var goal;
        console.log(now);
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
