// 変数とか要素の指定
var aj = new XMLHttpRequest;
var mainContent = document.getElementById("main");
var homeButton = document.getElementById("top");
var accessButton = document.getElementById("access");
var summaryButton = document.getElementById("summary");

// TODO: ブラウザの戻るボタンで戻るとQueryは変わるけど中身が変わらない

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



// EventListener(Headerのボタン)
document.addEventListener('DOMContentLoaded',function(){
    var btns = document.querySelectorAll('.head');
    for(var i = 0; i < btns.length; i++){
        btns[i].addEventListener('click',function(){
            aj.open("GET", "./mainContent/"+this.id+".html");
            aj.send();
            var query_title = this.id;
            aj.onreadystatechange = function() {
                if (aj.status === 200 && aj.readyState === 4) {
                    //console.log(aj.responseText);
                    mainContent.innerHTML = aj.responseText;
                    history.pushState('', "開智発表会2024", "./index.html?p="+query_title);
                }
            }
        },false);
    }
},false);