class Ship
{
	constructor(x, y, w, h, imageSource)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.ship = new Image();
		this.ship.src = imageSource;
	}
}

class Bullet
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
}

let canvas;
let ctx;
let buffer;
let pritisnjeneTipke = [];
let playerKeys = {"left": "a", "right": "d", "shoot": " "};
let player;
let bullets = [];
let enemies = [];
let enemyDir = 1;
let dol = false;
let tocke = 0; let rekord = 0;

function initKeybinds()
{
	let queryString = new URLSearchParams(document.URL.split('?')[1]); // read url and set keybinds

	for (let pair of queryString.entries()) // pair[0] - key, pair[1] - value
	   playerKeys[pair[0]] = pair[1];
}

function initBackground(){
	ctx.fillStyle = 'black';
}

function initEnemies()
{
	/*
		DIMENZIJE ENEMYEV:
		- small: x=30, y=25
		- medium: x=40, y=30
		- large: x=50, y=35
	*/
	let yS = 100; let yM1 = 135; let yM2 = 175; let yL1 = 205; let yL2 = 245;
	let xL = 10;
	small = []; medium1 = []; large1 = []; medium2 = []; large2 = [];
	for(let i = 0; i < 6; i++)
	{
		small.push(new Ship(xL+25-15, yS, 30, 25, "enemy_small.png"));
		medium1.push(new Ship(xL+25-20, yM1, 40, 30, "enemy_medium.png"));
		medium2.push(new Ship(xL+25-20, yM2, 40, 30, "enemy_medium.png"));
		large1.push(new Ship(xL, yL1, 50, 35, "enemy_large.png"));
		large2.push(new Ship(xL, yL2, 50, 35, "enemy_large.png"));

		xL += 58; // razmak
	}
	enemies.push(small, medium1, medium2, large1, large2);
}

function initElements()
{
	canvas = document.createElement("canvas");

	canvas.width = 500;
	canvas.height = 500;

	ctx = canvas.getContext("2d");
	buffer = canvas.getContext("2d");

	document.body.appendChild(canvas)
}

function drawBackground()
{
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function playerInput(e)
{
	console.log(e.key);
	pritisnjeneTipke[e.key.charCodeAt()] = e.key.charCodeAt();
	pritisnjeneTipke.forEach(tipka => {
		if(tipka == playerKeys["left"]) player.x -= 5; // left
		if(tipka == playerKeys["right"]) player.x += 5; // right
		if(tipka == playerKeys["shoot"]) bullets.push(new Bullet(player.x, player.y)); // shoot
	});
}

function drawPlayer()
{
	buffer.drawImage(player.ship, player.x-player.w/2, player.y, player.w, player.h)
}

function drawBullets()
{
	//skips function if no bullets exist
	if(bullets.length == 0)
		return;

	//draw all still existing bullets
	for(let i = 0; i < bullets.length; i++){
		ctx.fillStyle = "#05ff48"; // green
		buffer.beginPath();
		buffer.arc(bullets[i].x, bullets[i].y, 2, 0, 2*Math.PI);
		ctx.fill();
	}
	updateBullets();
}

function drawEnemies()
{
	if(enemies.length == 0){
		console.log("NI VEC NASPROTNIKOV!");
		return;
	}

	for(let i = 0; i < enemies.length; i++)
		for(let j = 0; j < enemies[i].length; j++)
			buffer.drawImage(enemies[i][j].ship, enemies[i][j].x, enemies[i][j].y, enemies[i][j].w, enemies[i][j].h);
}

function updateBullets()
{
	for(let i = 0; i < bullets.length; i++){
		bullets[i].y -= 3;
		if(bullets[i].y <= 0) //if bullet is off-screen then remove it from array
		{
			bullets.splice(i, 1);
			console.log("offscreen");
		}
	}
	for (let j = 0; j < enemies.length; j++) // enemy bullet collision
		for (let k = 0; k < enemies[j].length; k++)
			for(let i = 0; i < bullets.length && k < enemies[j].length; i++)
				if ((enemies[j][k].x - bullets[i].x > ((enemies[j][k].w+5)*(-1)) && enemies[j][k].x - bullets[i].x < 5) && (enemies[j][k].y - bullets[i].y > ((enemies[j][k].h+5)*(-1)) && enemies[j][k].y - bullets[i].y < 5)) {
					bullets.splice(i, 1);
					enemies[j].splice(k, 1);
					console.log("enemy collision");
					tocke += 10;
				}
}

function enemyMovement()
{
	for(let i = 0; i < enemies.length; i++) // ali rabi zamenjat smer
		if(enemies[i].length > 0)
		{
			if(enemies[i][0].x + enemyDir <= 0)
			{
				enemyDir *= -1; // zamenja smer
				if(dol == true)
				{
					for(let k = 0; k < enemies.length; k++)
						for(let c = 0; c < enemies[k].length; c++)
							enemies[k][c].y += 35; // premakni se dol     35
					dol = false;
					return;
				}
			}
			if(enemies[i][enemies[i].length-1].x + enemyDir >= canvas.width-30)
			{
				enemyDir *= -1;
				dol = true;
			}
		}


	for(let i = 0; i < enemies.length; i++) // posodobi poz enemy-ev
		for(let j = 0; j < enemies[i].length; j++)
			enemies[i][j].x += enemyDir;
}

function updateInterface()
{
	let tockeSpan = document.getElementById("tocke");
	let rekordSpan = document.getElementById("rekord");

	if(tocke >= rekord)
	{
		rekordSpan.innerHTML = tocke.toString();
		rekord = tocke;
	}
	else rekordSpan.innerHTML = tocke.toString();
	tockeSpan.innerHTML = tocke.toString();
}

function draw()
{
	drawBackground();
	drawPlayer();
	drawBullets();
	drawEnemies();
	enemyMovement();
	updateInterface();
	window.requestAnimationFrame(draw);
}

function init()
{
	document.addEventListener('keydown', playerInput);
	window.addEventListener('keyup',
	    function(e){
	        pritisnjeneTipke[e.key.charCodeAt()] = false;
	    },
	false);
	initKeybinds();
	initElements();
	initBackground();
	initEnemies();
	player = new Ship(canvas.width/2, canvas.height-30, 40, 20, "player.png");

	//start game
	draw();
}

// ENEMY: 2 large, 2 medium, 2 small, včasih ufo
// SLIKE: https://spaceinvaders.fandom.com/wiki/Space_Invaders_wiki