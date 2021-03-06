// We are in the master
var recorder, soundOut, soundFile;
var img;
var state = 0; // mousePress will increment from Record, to Stop, to

var balls = [];
var p5pianos = [];
var p5piano;
var p5pianoGs = [];
var p5pianoG;
var arps = [];
var arp;
var harps = [];
var harp;
var jungles = [];
var jungle;

function preload() {
  // Sound assets preload
  bottom4 = loadSound('jupiter_perchit_low.mp3');
  bottom5 = loadSound('p5pianoG4.mp3');

  for (var i = 0; i < 4; i++) {
    var p5piano = loadSound('p5piano' + i + '.mp3');
    p5pianos.push(p5piano);
  }

  for (var i = 0; i < 5; i++) {
    var p5pianoG = loadSound('p5pianoG' + i + '.mp3');
    p5pianoGs.push(p5pianoG);
  }

  for (var i = 0; i < 4; i++) {
    var arp = loadSound('arp_delaypad_G' + i + '.mp3');
    arps.push(arp);
  }

for (var i = 0; i < 4; i++) {
    var harp = loadSound('backwardsHarp' + i + '.mp3');
    harps.push(harp);
  }

for (var i = 0; i < 5; i++) {
    var jungle = loadSound('jungle' + i + '.mp3');
    jungles.push(jungle);
  }

  img = loadImage("am_back10a.jpg");
}

function setup() {
  createCanvas(1000, 650);
  image(img, 0, 0, width, height);

  textFont("Unica One");

  // FOR loop to push each ball object.
  for (var i = 0; i < 6; i++) {
    balls.push(new Ball(createVector(100 + i * 150, 130), createVector(50 + i * 150, 30), 50, createVector(50 + 150 * i, 50), 75, 300 + i * 50, i, false));
  }

}

function draw() {
  // Forces on ball
  var gravity = createVector(0, 0.000001);
  // var wind = createVector(0, 0.001);


  for (var i = 0; i < balls.length; i++) {
    balls[i].btnDisplay();
    balls[i].applyForce(gravity);
    // balls[i].applyForce(wind

    // IF statement about the true/false button pressed for un/freeze ball motion
    if (balls[i].move) {
      balls[i].update();
      balls[i].displayRect();
      balls[i].display();
      balls[i].checkEdges();
    } else balls[i].displayRect();
    balls[i].display();
  }
}

function touchStarted() {
  // go through each ball object
  for (var i = 0; i < balls.length; i++) {
    // to see if the mouse is on the reactanle or not
    if (touchX > balls[i].btnPosition.x && touchX < balls[i].btnPosition.x + 75 &&
      touchY > balls[i].btnPosition.y && touchY < balls[i].btnPosition.y + 20) {
      balls[i].move = !balls[i].move;
    }
  }

  // if (touchX > 590 && touchX < 660 && touchY > 610 && touchY < 680) {
  //   recorder.record(soundFile);
  //   console.log("recording");
  // } else if (touchX > 670 && touchX < 740 && touchY > 610 && touchY < 680) {
  //   recorder.stop();
  //   console.log("stop");
  // } else if (touchX > 750 && touchX < 820 && touchY > 610 && touchY < 680) {
  //   soundFile.play();
  //   console.log("playing");
  // }
}

function display() {
  //	this.balls[i].applyForce(wind);
  this.balls[i].applyForce(gravity);
  this.balls[i].update();
  this.balls[i].display();
  this.balls[i].checkEdges(edges);
}

// added btnPosition to represent the position of the button, and boolean variable move.
function Ball(position, btnPosition, mass, recPosition, recWidth, recHeight, sound, move) {
  this.position = position;
  this.btnPosition = btnPosition;
  // speedX = some number between -1 and 1
  // speedY = some number between -1 and 0
  this.velocity = createVector(random(-.5, 1), random(-1, 0));
  this.acceleration = createVector(0, 0.05);
  this.mass = mass; // totally made up, do whatever here
  this.recPosition = recPosition;
  this.recHeight = recHeight;
  this.recWidth = recWidth;
  this.sound = sound;
  //  this.alpha = 255;
  this.move = move;
}

Ball.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};

Ball.prototype.display = function() {
  noStroke();
  colorMode(HSB);
  fill(200, 90, 80);
  ellipse(this.position.x, this.position.y, this.mass, this.mass);
};

Ball.prototype.displayRect = function() {
  noStroke();
  fill(165, 36, 83);
  rect(this.recPosition.x, this.recPosition.y, this.recWidth, this.recHeight);
}

Ball.prototype.btnDisplay = function() {
  // draw a reactangle as a button
  noStroke();
  fill(0, 0, 88);
  rect(this.btnPosition.x, this.btnPosition.y, 75, 20);
};

Ball.prototype.checkEdges = function() {
  if (this.position.x > (this.recPosition.x + (this.recWidth - 25))) {
    this.position.x = (this.recPosition.x + (this.recWidth - 25));
    this.velocity.x *= -1;
  } else if (this.position.x < (this.recPosition.x + 25)) {
    this.position.x = this.recPosition.x + 25;
    this.velocity.x *= -1;
  }
  if (this.position.y > (this.recPosition.y + this.recHeight) - 25) {
    if (this.sound === 0) {
      p5piano = p5pianos[Math.floor(random(0, 4))];
      p5piano.play();
      p5piano.setVolume(0.1);
    } else if (this.sound === 1) {
      arp = arps[Math.floor(random(0, 4))];
      arp.play();
      arp.setVolume(1);
    } else if (this.sound === 2) {
      p5pianoG = p5pianoGs[Math.floor(random(0, 4))];
      p5pianoG.play();
      p5pianoG.setVolume(0.2);
    } else if (this.sound === 3) {
      harp = harps[Math.floor(random(0, 4))];
      harp.play();
      harp.setVolume(0.3);
    } else if (this.sound === 4) {
      bottom4.play();
    } else if (this.sound === 5) {
      jungle = jungles[Math.floor(random(0, 4))];
      jungle.play();
      jungle.setVolume(0.2);
    }

    this.velocity.y *= -1;
    this.position.y = ((this.recPosition.y + this.recHeight) - 25);
  } else if (this.position.y < (this.recPosition.y)) {
    this.position.y = this.recPosition.y;
    this.velocity.y *= -1;
    // this.alpha -= 25;
  }
};

Ball.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force, this.mass);
  this.acceleration.add(f);
};
