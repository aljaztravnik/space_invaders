let start = document.getElementById("startImg");
let settings = document.getElementById("settingsImg");
let playerData = {"left": 97, "right": 100, "shoot": 32, "uname": "Janez"};

start.addEventListener("click", () => {
    let url = "game_page.html?";
    url += "left=" + playerData["left"] + "&";
    url += "right=" + playerData["right"] + "&";
    url += "shoot=" + playerData["shoot"] + "&";
    url += "uname=" + playerData["uname"];

    window.location = url;
});

settings.addEventListener("click", () => {
    if(document.getElementById("uname").value.length > 0) playerData["uname"] = document.getElementById("uname").value;
    let url = "settings_page.html?";
    url += "left=" + playerData["left"] + "&";
    url += "right=" + playerData["right"] + "&";
    url += "shoot=" + playerData["shoot"] + "&";
    url += "uname=" + playerData["uname"];

    window.location = url;
});

function initVars()
{
    let queryString = new URLSearchParams(document.URL.split('?')[1]);

	for (let pair of queryString.entries())
	   playerData[pair[0]] = pair[1];
}