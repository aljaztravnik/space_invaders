/*$("#my-table input[type='button']").click(function(){
    var parameter = $(this).val();
    window.location = "http://yoursite.com/page?variable=" + parameter;
});*/

// spremeni left right in shoot v array in hkrati tudi booleane za njih

let action = [document.getElementById("moveLeft"), document.getElementById("moveRight"), document.getElementById("shoot"), "Janez"];
let changeButton = [document.getElementById("changeLeft"), document.getElementById("changeRight"), document.getElementById("changeShoot")];
let awaitKey = [false, false, false];
let back = document.getElementById("backImg");

function initVars()
{
    let queryString = new URLSearchParams(document.URL.split('?')[1]);
    let i = 0;

	for (let pair of queryString.entries())
    {
        if(i == 3) action[i] = pair[1];
        else action[i].innerHTML = String.fromCharCode(pair[1]);
        i++;
    }
}

document.addEventListener('keydown', (e) => {
    for(let i = 0; i < awaitKey.length; i++)
        if(awaitKey[i] == true)
        {
            action[i].innerHTML = e.key;
            awaitKey[i] = false;
        }
});

changeButton[0].addEventListener("click", () => {
    if(awaitKey[1] == false && awaitKey[2] == false) awaitKey[0] = true;
    else console.log("DOKONCAJ PREJSNJI VNOS!");
});

changeButton[1].addEventListener("click", () => {
    if(awaitKey[0] == false && awaitKey[2] == false) awaitKey[1] = true;
    else console.log("DOKONCAJ PREJSNJI VNOS!");
});

changeButton[2].addEventListener("click", () => {
    if(awaitKey[0] == false && awaitKey[1] == false) awaitKey[2] = true;
    else console.log("DOKONCAJ PREJSNJI VNOS!");
});

back.addEventListener("click", () => {
    let url = "index.html?";
    url += "left=" + action[0].innerHTML.charCodeAt() + "&";
    url += "right=" + action[1].innerHTML.charCodeAt() + "&";
    url += "shoot=" + action[2].innerHTML.charCodeAt() + "&";
    url += "uname=" + action[3];
    window.location = url;
});