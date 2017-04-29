/*
* @author Stefano Ballerini
*
* Inspired on Daniel Shiffman - Animated Circle Packing - "The Coding Train"
* youtube: https://www.youtube.com/watch?v=QHEQuoIKgNE&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=62
*/

var totalCircles = 30;
var circles = [];

var font;

var spots = [];

function preload(){
	font = loadFont('font/Chunkfive.otf');
}

function setup() {
	createCanvas(800, 500);
	textFont(font);
	textSize(128);

	frameRate(20);

	spots = font.textToPoints('BUBBLE', 100, 200);

}

function draw(){
	
	background(255);

	var count = 0;
	
	while(count < totalCircles && spots.length != 0){

		var newC = newCircle();

		if (newC != null){
			circles.push(newC);
			count++; 
		}

	}

	for (var i in circles) {
		if(circles[i].growing){
			if(circles[i].edges()){
				circles[i].growing = false;
			}else{
				for (var j in circles){
					if(i != j){
						var d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
						if (d - 2 < circles[i].r + circles[j].r){
							circles[i].growing = false;
							break;
						}
					}
				}
			}
		}
		circles[i].show();
		circles[i].grow();
	}
}

function newCircle(){

	var spot = Math.floor(random(0, spots.length));

	var x = spots[spot].x;
	var y = spots[spot].y;

	// Don't pick the same spot twice
	spots.splice(spot, 1);

	var valid = true;

	for (var i = 0; i < circles.length; i++) {
		var d = dist(x, y, circles[i].x, circles[i].y)
		if(d < circles[i].r + 2){
			valid = false;
			break;
		}
	}

	if(valid)
		return new Circle(x, y);
	else
		return null;

}






