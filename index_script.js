let start = document.getElementById("startImg");
let settings = document.getElementById("settingsImg");
let playerNum = document.getElementById("playerNumImg");
let playerData = {"left": 97, "right": 100, "shoot": 115, "uname": "Janez", "left1": 106, "right1": 108, "shoot1": 107, "uname1": "Micka", "coOp": -1};

function initVars()
{
    let queryString = new URLSearchParams(document.URL.split('?')[1]);

	for (let pair of queryString.entries())
	   playerData[pair[0]] = pair[1];

    document.getElementById("playerNumImg").src = (playerData["coOp"] == 1) ?  "two_players.png" : "one_player.png";
}

start.addEventListener("click", () => {
    let url = "game_page.html?";
    url += "left=" + playerData["left"] + "&";
    url += "right=" + playerData["right"] + "&";
    url += "shoot=" + playerData["shoot"] + "&";
    url += "uname=" + playerData["uname"];
    if(playerData["coOp"] == 1)
    {
        url += "&left1=" + playerData["left1"] + "&";
        url += "right1=" + playerData["right1"] + "&";
        url += "shoot1=" + playerData["shoot1"] + "&";
        url += "uname1=" + playerData["uname1"] + "&";
        url += "coOp=" + playerData["coOp"];
    }
    window.location = url;
});

playerNum.addEventListener("click", () => {
    playerData["coOp"] *= -1;
    document.getElementById("playerNumImg").src = (playerData["coOp"] == 1) ?  "two_players.png" : "one_player.png";
});

settings.addEventListener("click", () => {
    if(document.getElementById("uname").value.length > 0) playerData["uname"] = document.getElementById("uname").value;
    let url = "settings_page.html?";
    url += "left=" + playerData["left"] + "&";
    url += "right=" + playerData["right"] + "&";
    url += "shoot=" + playerData["shoot"] + "&";
    url += "uname=" + playerData["uname"] + "&";
    url += "left1=" + playerData["left1"] + "&";
    url += "right1=" + playerData["right1"] + "&";
    url += "shoot1=" + playerData["shoot1"] + "&";
    url += "uname1=" + playerData["uname1"] + "&";
    url += "coOp=" + playerData["coOp"];

    window.location = url;
});