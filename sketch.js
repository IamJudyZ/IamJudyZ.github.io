// let tempX, tempY;
let people = [];
let nums = 50;
// speed = 3;
let dict = {}
var speed = .5;
let myCanvas;
var tempX;
var tempY;

function setup() {
  createCanvas(600, windowHeight);
  me = Math.round(random(0, nums));
  you = Math.round(random(0, nums));
  
  for (let i=0; i<nums; i++) {
    people[i] = new Person(random(0, width), random(0, height), 20, random(-3,3), random(-3, 3));
    let numOfConnections = random(0, 10);
    dict[i] = [];
    for (let v = 0; v<numOfConnections; v++) {
      dict[i].push(Math.round(random(0, nums)));
    }
  }
  console.log(you, me);
  console.log(dict[you]);
  console.log(dict[me]);
  
}

function draw() {
  background(200);
  fill(0);
  noStroke();
  text('me', people[me].x-8, people[me].y-15);
  text('you', people[you].x-8, people[you].y-15);
  for (let j=0; j<people.length; j++) {
    people[j].show();
    people[j].move();
    // people[j].connect(people[0]);
  }
  for (let i = 0; i<people.length; i++) {
    for (let a = 0; a<people.length; a++) {
      // if (Math.abs(people[i].x - people[a].x) < Math.min(people[i].maxDistX, people[a].maxDistX) && Math.abs(people[i].y-people[a].y) < Math.min(people[i].maxDistY, people[a].maxDistY) && dict[i].includes(a)) {
      if (dist(people[i].x, people[i].y, people[a].x, people[a].y) < Math.min(people[i].maxDistX, people[a].maxDistX) && dict[i].includes(a)) {
        if ((i==me && a == you) || (a == me && i == you)) {
          people[i].animateLine(people[a], 1);
        }
        else {
          people[i].animateLine(people[a], 0);
        }
      }
    }
  }
}

class Person {
  constructor(x, y, r, Xspeed, Yspeed) {
    this.x=x;
    this.y=y;
    this.r=r;
    this.Xspeed = Xspeed;
    this.Yspeed = Yspeed;
    this.maxDistX = random(50, 450);
    this.angle = 0.0;
  }
  
  show() {
    fill(0, 130);
    noStroke();
    ellipse(this.x, this.y, this.r);
  }
  
  move() {
    this.x+=this.Xspeed;
    this.y+=this.Yspeed;
    
    if (this.x > width || this.x < 0) {
      this.Xspeed *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.Yspeed *= -1;
    }
    
  }
  
  connect(other) {
    
    stroke(250, 50, 100, 205);
    strokeWeight(1);    
    
    line(this.x, this.y, other.x, other.y);
    
  }
  
  animateLine(other, color) {
    
    if (color == 1) {
      stroke(250, 50, 100, 205);
    }
    else {
      stroke(119,136,153, 205);
    }
    
    this.start = createVector(this.x, this.y);
    
    tempX = map(this.angle, 0, 100, this.start.x, other.x, 1);
    tempY = map(this.angle, 0, 100, this.start.y, other.y, 1);

    this.current = createVector(tempX, tempY);

    // if(tempX == other.x && tempY == other.y){
    //   ready = true; 
    // }
    this.angle += speed;
    
    line(this.start.x, this.start.y, this.current.x, this.current.y)

  }
  
}
//__________________________________________________________________________
// HTML
function addUserLabel() {
	document.getElementById("userLabel").innerHTML = "Allow Sound"
	p = new Person(5, 5, 5, 6, 6);
  p.show()

}