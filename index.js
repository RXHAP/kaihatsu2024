function sleepSetTimeout(ms, callback) {
    setTimeout(callback, ms);
}

// 変数とか要素の指定
var mainContent = document.getElementById("main");
var aj = new XMLHttpRequest;

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
        }
    }
}

/*
// EventListener(Headerのボタン)
var btns = document.querySelectorAll('.head');
for(var i = 0; i < btns.length; i++){
    btns[i].addEventListener('click',function(){
        var aj = new XMLHttpRequest;
        aj.open("GET", "./mainContent/"+this.id+".html");
        aj.send();
        var query_title = this.id;
        aj.onreadystatechange = function() {
            if (aj.status === 200 && aj.readyState === 4) {
                //console.log(aj.responseText);
                mainContent.innerHTML = aj.responseText;
                history.pushState(query_title, "開智発表会2024", "./index.html?p="+query_title);
            }
        }
    },false);
}
*/

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
            }
        }
    }
    else {
        console.log("建設中...")
        alert("このページは準備中です。")
    }
});

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
        }
    }
});



// ブラウザの戻るボタンの検知で画面更新
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
            }
        }
    }
})

// スクロールを検知してヘッダーをなんかいい感じにするやつ
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


$(function(){
    sleepSetTimeout(1000, () => $(".title").animate({opacity: 0,}, 1000));
    sleepSetTimeout(2000, () => $(".title").remove())
});
