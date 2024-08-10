// 変数とか要素の指定
var maincontainer = document.getElementById("maincontainer");

$(maincontainer).on("click", function() {
    maincontainer.innerHTML = `
    <!-- ここからHeader -->
    <header>
        <div class="container-fluid">
            <div class="row ">

                <div class="col-2 ">
                    <button class="head center-block" id="top">トップ</button>
                </div>
                <div class="col-2 ">
                    <button class="head center-block" id="summary">概要</button>
                </div>
                <div class="col-2 ">
                    <button class="head center-block" id="access">アクセス</button>
                </div>
                <div class="col-2 ">
                    <button class="head center-block" id="notice">お知らせ</button>
                </div>
                <div class="col-2 ">
                    <button class="head center-block" id="project">企画・探究一覧</button>
                </div>
                <div class="col-2 ">
                    <button class="head center-block" id="timetable">タイムテーブル</button>
                </div>

            </div>
        </div>
    </header>

    <!-- ここから本体(の枠組) -->
    <div class="container-fluid main">
        <div class="row">
            <div class="col " id="main">

            </div>
        </div>
    </div>
    `;

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
})
