mode = 'pom';
going = false;
min = 25;
sec = 00;
total = 1500;
let interval;

document.getElementById("start").onclick = function(){
  if (going) {
    document.getElementById("start_txt").innerHTML = "Continue";
    going = false;
  }
	else {
    going = true;
    document.getElementById("start_txt").innerHTML = "Pause";
    document.getElementById("skip").style.visibility = 'visible';
    startTimer();
  }
}

document.getElementById("skip").onclick = function(){
  next();
}

document.getElementById("pom").onclick = function(){
  pomotab();
}

document.getElementById("short").onclick = function(){
  shortab();
}

document.getElementById("long").onclick = function(){
  longtab();
}

function getRemaining(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  total = Number.parseInt(difference / 1000, 10);
  min = Number.parseInt((total / 60) % 60, 10);
  sec = Number.parseInt(total % 60, 10);
}

function startTimer() {
  const endTime = Date.parse(new Date()) + total * 1000;
  interval = setInterval(function() {
    currentTime = Date.parse(new Date());
    difference = endTime - currentTime;
    if (going) {
      total = Number.parseInt(difference / 1000, 10);
      min = Number.parseInt((total / 60) % 60, 10);
      sec = Number.parseInt(total % 60, 10);
      updateClock();
    }
    if (!going || total <= 0) {
      clearInterval(interval);
    }
    if (total <= 0) {
      next();
    }
  }, 1000);
}

function updateClock() {
  let formattedMin = min.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  let formattedSec = sec.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  document.getElementById("min").innerHTML = formattedMin;
  document.getElementById("sec").innerHTML = formattedSec;
}

function next() {
  if (mode == 'pom') shortab();
  else pomotab();
}

function longtab() {
  if (mode != 'long') {
    going = false;
    mode = 'long';
    document.getElementById("pom").style.opacity = '41%';
    document.getElementById("short").style.opacity = '41%';
    document.getElementById("long").style.opacity = '98%';
    document.getElementById("skip").style.visibility = 'hidden';
    document.getElementById("start_txt").innerHTML = "Start";
    min = 15;
    sec = 0;
    total = 900;
    updateClock();
  }
}

function shortab() {
  if (mode != 'short') {
    going = false;
    mode = 'short';
    document.getElementById("pom").style.opacity = '41%';
    document.getElementById("short").style.opacity = '98%';
    document.getElementById("long").style.opacity = '41%';
    document.getElementById("skip").style.visibility = 'hidden';
    document.getElementById("start_txt").innerHTML = "Start";
    min = 5;
    sec = 0;
    total = 300;
    updateClock();
  }
}

function pomotab() {
  if (mode != 'pom') {
    going = false;
    mode = 'pom';
    document.getElementById("pom").style.opacity = '98%';
    document.getElementById("short").style.opacity = '41%';
    document.getElementById("long").style.opacity = '41%';
    document.getElementById("skip").style.visibility = 'hidden';
    document.getElementById("start_txt").innerHTML = "Start";
    min = 25;
    sec = 0;
    total = 1500;
    updateClock();
  }
}