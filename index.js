var aj = new XMLHttpRequest;
var mainContent = document.getElementById("main");
var homeButton = document.getElementById("home");
var accessButton = document.getElementById("access");

homeButton.addEventListener("click", () => {
    aj.open("GET", "./home.html");
    aj.send();

    aj.onreadystatechange = function() {
        if (aj.status === 200 && aj.readyState === 4) {
            console.log(aj.responseText);
            mainContent.innerHTML = aj.responseText;
        }
    }
});

accessButton.addEventListener("click", () => {
    aj.open("GET", "./access.html");
    aj.send();

    aj.onreadystatechange = function() {
        if (aj.status === 200 && aj.readyState === 4) {
            console.log(aj.responseText);
            mainContent.innerHTML = aj.responseText;
        }
    }
});