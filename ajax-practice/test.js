var x = new XMLHttpRequest();
var insert = document.getElementById("insert");
var button = document.getElementById("ajax-button");

button.addEventListener("click", () => {
    x.open("GET", "./other.html");
    x.send();

    x.onreadystatechange = function() {
        if (x.status === 200 && x.readyState === 4) {
            //console.log(xhr.responseText);
            insert.innerHTML = x.responseText;
        }
    }
});