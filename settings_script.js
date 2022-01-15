/*$("#my-table input[type='button']").click(function(){
    var parameter = $(this).val();
    window.location = "http://yoursite.com/page?variable=" + parameter;
});*/

// spremeni left right in shoot v array in hkrati tudi booleane za njih

let action = [document.getElementById("moveLeft"),
              document.getElementById("moveRight"),
              document.getElementById("shoot"),
              "Janez",
              document.getElementById("moveLeft1"),
              document.getElementById("moveRight1"),
              document.getElementById("shoot1"),
              "Micka",
              -1
];
let changeButton = [document.getElementById("changeLeft"),
                    document.getElementById("changeRight"),
                    document.getElementById("changeShoot"),
                    document.getElementById("changeLeft1"),
                    document.getElementById("changeRight1"),
                    document.getElementById("changeShoot1")
];
let awaitKey = [false, false, false, false, false, false];
let back = document.getElementById("backImg");
let checker = podanArr => podanArr.every(v => v === false); // preveri, če so vsi elementi v arrayu false

function initVars()
{
    let queryString = new URLSearchParams(document.URL.split('?')[1]);
    let i = 0;

	for (let pair of queryString.entries())
    {
        if(i == 3 || i == 7 || i == 8) action[i] = pair[1];
        else action[i].innerHTML = String.fromCharCode(pair[1]);
        i++;
    }
}

document.addEventListener('keydown', (e) => {
    for(let i = 0; i < 3; i++)
        if(awaitKey[i] == true)
        {
            action[i].innerHTML = e.key;
            awaitKey[i] = false;
        }
    for(let i = 3; i < awaitKey.length; i++)
        if(awaitKey[i] == true)
        {
            action[i+1].innerHTML = e.key;
            console.log(e.keyCode);
            awaitKey[i] = false;
        }
});

function afsd(st)
{
    if(checker(awaitKey) == true) awaitKey[st] = true;
    else console.log("DOKONCAJ PREJSNJI VNOS!");
}

changeButton[0].addEventListener("click", () => {
    afsd(0);
});

changeButton[1].addEventListener("click", () => {
    afsd(1);
});

changeButton[2].addEventListener("click", () => {
    afsd(2);
});

changeButton[3].addEventListener("click", () => {
    afsd(3);
});

changeButton[4].addEventListener("click", () => {
    afsd(4);
});

changeButton[5].addEventListener("click", () => {
    afsd(5);
});

back.addEventListener("click", () => {
    let url = "index.html?";
    url += "left=" + action[0].innerHTML.charCodeAt() + "&";
    url += "right=" + action[1].innerHTML.charCodeAt() + "&";
    url += "shoot=" + action[2].innerHTML.charCodeAt() + "&";
    url += "uname=" + action[3] + "&";
    url += "left1=" + action[4].innerHTML.charCodeAt() + "&";
    url += "right1=" + action[5].innerHTML.charCodeAt() + "&";
    url += "shoot1=" + action[6].innerHTML.charCodeAt() + "&";
    url += "uname1=" + action[7] + "&";
    url += "coOp=" + action[8];
    window.location = url;
});