// お知らせページのお知らせ取得関数
async function loadCSVData() {
  const response = await fetch('/2024/notice.csv');
  const text = await response.text();
  const data = text.trim().split('\n').map(line => line.split(',').map(x => x.trim()));
  var articles = "";
  for (var i = 0; i < data.length; i++) {
    articles += `<article style="margin-bottom:80px;">
  <h2 class="underline no-space">`+ data[i][0] + `</h2>
  <p>`+ data[i][1] + `</p>
</article>`;
    console.log(data[i][0] + ":" + data[i][1])
  }
  document.getElementById('detail').innerHTML = articles;
}


// タイムテーブル生成用関数
async function getTimetable(day) {
  if (eventtime == 0) {
    document.getElementById("day1").addEventListener("click", function() {
      getTimetable("day1")
    });
    document.getElementById("day2").addEventListener("click", function() {
      getTimetable("day2")
    });
    eventtime = 1;
  }
  $(".pjcontent").remove();
  const table = document.getElementById("timetable-area");
  const timetable = await fetch("/2024/timetable/" + day + ".csv");
  const text = await timetable.text();
  const data = text.trim().split("\n").map(line => line.split(',').map(x => x.trim()));
  var tablehtml = ""
  for (var i = 0; i < data.length; i++) {
    tablehtml += `<a href="#" class="pjcontent" style="text-decoration:none; position:absolute; top:` + (data[i][0]-9)/6.5*100 + `%; left:` + (data[i][2]*25+1) + `%; width:23%; height:` + data[i][1]/6.5*100 + `%; background-color:#fcc76a; display:table;">
  <h6 style="color:black; text-align:center; margin:0; vertical-align:middle; display:table-cell; word-break:break-all;">`+ data[i][3] + `<br>` + Math.floor(data[i][0]) + `:` + ("00"+Math.round((data[i][0]-Math.floor(data[i][0]))*60)).slice(-2)  + `~</h6>
</a>`;
  }
  table.innerHTML += tablehtml;
  if (day == "day1") {
    document.getElementById("day").innerHTML = "一日目";
  }
  else {
    document.getElementById("day").innerHTML = "二日目";
  }
}


// 変数とか要素の指定
var eventtime = 0;
var mainContent = document.getElementById("main");
var loadcontent = location.pathname.split('/');
console.log(loadcontent[2]);
if (loadcontent[2] == "" || loadcontent[2] == "index.html") {
  loadcontent[2] = "top"
}
mainContent.innerHTML = "<p>loading...</p>";
$.ajax({
  url: "/2024/mainContent/" + loadcontent[2] + ".html",
  dataType: "html",
  cache: false,
  success: function (res) {
    //console.log(res);
    mainContent.innerHTML = "";
    var newcontent = document.createElement("div");
    newcontent.innerHTML = res;
    mainContent.appendChild(newcontent);
    if (loadcontent[2] == "top") {
      history.pushState("top", "開智発表会2024", "/2024/");
    }
    else {
      history.pushState(loadcontent[2], "開智発表会2024", "/2024/" + loadcontent[2] + "/");
      if (location.pathname.split("/")[2] == "notice") {
        loadCSVData();
      }
      if (location.pathname.split("/")[2] == "timetable") {
        getTimetable("day1");
      }
    }
  },
  error: function () {
    mainContent.innerHTML = "error: 読み込みに失敗しました。再読み込みしてください。"
  }
});


// ヘッダーのaタグを無効化してAjaxを使うゴリ押し実装
$(".nav-link").click(function (event) {
  event.preventDefault(); //イベントの無効化
  var loadcontent = $(this).attr("id"); //ID取得

  if (loadcontent != "constructing") {
    console.log(loadcontent);
    mainContent.innerHTML = "<p>loading...</p>";
    $.ajax({
      url: "/2024/mainContent/" + loadcontent + ".html",
      dataType: "html",
      cache: false,
      success: function (res) {
        //console.log(res);
        mainContent.innerHTML = "";
        var newcontent = document.createElement("div");
        newcontent.innerHTML = res;
        mainContent.appendChild(newcontent);
        history.pushState(loadcontent, "開智発表会2024", "/2024/" + loadcontent + "/");
        if (location.pathname.split("/")[2] == "notice") {
          loadCSVData();
        }
        if (location.pathname.split("/")[2] == "timetable") {
          getTimetable("day1");
        }
      },
      error: function () {
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
$(".navbar-brand").click(function (event) {
  event.preventDefault(); //イベントの無効化
  console.log($(this).attr("id"));
  mainContent.innerHTML = "<p>loading...</p>";
  $.ajax({
    url: "/2024/mainContent/top.html",
    dataType: "html",
    cache: false,
    success: function (res) {
      //console.log(res);
      mainContent.innerHTML = "";
      var newcontent = document.createElement("div");
      newcontent.innerHTML = res;
      mainContent.appendChild(newcontent);
      history.pushState("top", "開智発表会2024", "/2024/");
    },
    error: function () {
      mainContent.innerHTML = "error: 読み込みに失敗しました。再読み込みしてください。"
    }
  });
});



// ブラウザの戻るボタンの検知でAjax
window.addEventListener("popstate", function (e) {
  //console.log(e.state);
  if (e.state != null) {
    var loadcontent = e.state;
    console.log("back to " + loadcontent);
    mainContent.innerHTML = "<p>loading...</p>";
    $.ajax({
      url: "/2024/mainContent/" + loadcontent + ".html",
      dataType: "html",
      cache: false,
      success: function (res) {
        //console.log(res);
        mainContent.innerHTML = "";
        var newcontent = document.createElement("div");
        newcontent.innerHTML = res;
        mainContent.appendChild(newcontent);
        if (location.pathname.split("/")[2] == "notice") {
          loadCSVData();
        }
        if (location.pathname.split("/")[2] == "timetable") {
          getTimetable("day1");
        }
      },
      error: function () {
        mainContent.innerHTML = "error: 読み込みに失敗しました。再読み込みしてください。"
      }
    });
  }
  else {
    mainContent.innerHTML = "<p>loading...</p>";
    $.ajax({
      url: "/2024/mainContent/top.html",
      dataType: "html",
      cache: false,
      success: function (res) {
        //console.log(res);
        mainContent.innerHTML = "";
        var newcontent = document.createElement("div");
        newcontent.innerHTML = res;
        mainContent.appendChild(newcontent);
      },
      error: function () {
        mainContent.innerHTML = "error: 読み込みに失敗しました。再読み込みしてください。"
      }
    });
  }
})


// トップページのカウントダウンのプログラム
function showRestTime() {
  // トップページでないとエラーがうるさいから条件つき
  if (location.pathname.split("/")[2] == "") {
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
