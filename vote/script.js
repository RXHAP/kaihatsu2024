const attribute = document.getElementById("attribute");
const times = document.getElementById("times");
const room1 = document.getElementById("room1");
const room2 = document.getElementById("room2");
const room3 = document.getElementById("room3");
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage3 = document.getElementById("stage3");
const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");
const music3 = document.getElementById("music3");
const eat = document.getElementById("eat");
const wall = document.getElementById("wall");


async function checkVote(id) {
  return new Promise((resolve, reject) => {
    let form = new FormData();
    form.append("parameter", "parameter");

    const url = "https://xs765341.xsrv.jp/index.cgi/api/"+id+"/";
    fetch(url, {method: "GET"})
      .then(Response => Response.text())
      .then(data => {
        console.log(data);
        return resolve(data);
      });
  })
}

function setProject() {
  fetch("https://kaichi-fes.jp/2024/jsonfile.json")
    .then(Response => Response.json())
    .then(data => {
      //console.log(data)
      for (var id in data) {
        //console.log(id)
        if (data[id]["tag"][0] == "クラス") {
          if (data[id]["isFoodVendor"] == true) {
            //console.log("Food:" + data[id]["projectName"])
            eat.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
          }
          else {
            //console.log("Room:" + data[id]["projectName"])
            room1.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
            room2.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
            room3.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
          }
        }
        else if (data[id]["tag"][0] == "音楽") {
          //console.log("Music:" + data[id]["projectName"])
          music1.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
          music2.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
          music3.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
        }
        else if (data[id]["tag"][0] == "舞台") {
          //console.log("Stage:" + data[id]["projectName"])
          stage1.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
          stage2.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
          stage3.innerHTML += '<option value="'+ id +'">'+ data[id]["organizationName"] +' - '+ data[id]["projectName"] +'</option>'
        }
      }
    })
}



const searchParams = new URLSearchParams(window.location.search.slice(1));
let queryEntries = searchParams.entries();
let queryObject = Object.fromEntries(queryEntries);
const qrid = String(Number.parseInt(queryObject["p"]))

now = new Date();
finish = new Date(2024, 8, 15, "15", "20", "0");
if (now < finish) {
  checkVote(qrid).then(result => {
    //console.log(result.slice(-2))
    if (result != "そんなIDねえよ うるせえよ") {
      if (result != "0") {
        //console.log("それ使用済みだなぁw")
        alert("そのQRコードは使用済みです。もし間違いである場合はお手数ですが本部までお越しください。")
        document.body.innerHTML = "もう一度QRコードを読み込んでください。"
      }
      else {
        setProject();
      }
    }
    else {
      //console.log("IDないよw")
      alert("パンフレッドについているQRコードからのみ投票できます。もし何度QRコードを読み込んでもこのメッセージが出る場合はお手数ですが本部までお越しください。")
      document.body.innerHTML = "もう一度QRコードを読み込んでください。"
    }
  })
}
else {
  document.body.innerHTML = "投票の受付は終了しました。"
}



document.getElementById("submit").addEventListener("click", function() {
  console.log(attribute.value)
  console.log(times.value)
  console.log(room1.value)
  console.log(room2.value)
  console.log(room3.value)
  console.log(stage1.value)
  console.log(stage2.value)
  console.log(stage3.value)
  console.log(music1.value)
  console.log(music2.value)
  console.log(music3.value)
  console.log(eat.value)
  console.log(wall.value)
  if (attribute.value != "null" && times.value != "null" && room1.value != room2.value && room2.value != room3.value && room1.value != room3.value && stage1.value != stage2.value && stage2.value != stage3.value && stage1.value != stage3.value && music1.value != music2.value && music2.value != music3.value && music1.value != music3.value){
    url = "https://xs765341.xsrv.jp/index.cgi/api/"+qrid+"/voted/"+attribute.value+"/"+times.value+"/"+room1.value+"/"+room2.value+"/"+room3.value+"/"+stage1.value+"/"+stage2.value+"/"+stage3.value+"/"+music1.value+"/"+music2.value+"/"+music3.value+"/"+eat.value+"/"+wall.value;
    fetch(url).then(Response => Response.text())
      .then(res => {
        console.log(res);
        console.log(url);
        if (res != "そんなIDねえよ うるせえよ") {
          if (res == "Value Changed") {
            alert("投票が完了しました。ありがとうございました。");
            document.body.innerHTML = "ありがとうございました。タブを閉じても大丈夫です。";
          }
          else {
            alert("投票済みのQRコードです。もし間違いである場合はお手数ですが本部までお越しください。");
          }
        }
        else {
          alert("予期せぬエラーが発生しました。QRコードを読み直してください。");
        }
      })
  }
  else{
    alert("入力に不備があります。Q1、Q2が入力してあるか、複数投票できる質問で選択の重複がないか確認してください。");
  }
});