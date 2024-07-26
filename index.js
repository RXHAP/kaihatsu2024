// 変数とか要素の指定
var aj = new XMLHttpRequest;
var mainContent = document.getElementById("main");
var homeButton = document.getElementById("home");
var accessButton = document.getElementById("access");

// TODO: ブラウザの戻るボタンで戻るとQueryは変わるけど中身が変わらない

// Queryの処理 もうちょっと綺麗に書きたいね
var queryStr = window.location.search.slice(1);
var queries = {};
// Queryがないときにundefinedにならないように
if (!queryStr) {
    // リンク置き換え & Ajax
    history.replaceState('', "Home - 開智発表会2024", "./index.html?p=home");
    aj.open("GET", "./mainContent/home.html");
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



// ここからイベントリスナー
//Home
homeButton.addEventListener("click", () => {
    // Ajaxでいい感じにページ遷移
    aj.open("GET", "./mainContent/home.html");
    aj.send();

    aj.onreadystatechange = function() {
        if (aj.status === 200 && aj.readyState === 4) {
            //console.log(aj.responseText);
            mainContent.innerHTML = aj.responseText;
            history.pushState('', "Home - 開智発表会2024", "./index.html?p=home");
        }
    }
});

//Access
accessButton.addEventListener("click", () => {
    // Ajaxでいい感じにページ遷移
    aj.open("GET", "./mainContent/access.html");
    aj.send();

    aj.onreadystatechange = function() {
        if (aj.status === 200 && aj.readyState === 4) {
            //console.log(aj.responseText);
            mainContent.innerHTML = aj.responseText;
            history.pushState('', "Access - 開智発表会2024", "./index.html?p=access");
        }
    }
});