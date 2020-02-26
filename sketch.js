/*Dominic Florack Jan 2020*/ 

var shift = 0
var size = 0
var grow = 0
var count = 0
var h, minCol, maxCol,val, tempVal



function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(minCol+50,255,255)
  size = floor((width / 16 + height / 16) / 2)
  count = 0
  shift = 0
  slider.position(width - 100, 25);
  minCol = random(156, 196)
  maxCol = random(224, 255) 
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, P2D)
  canvas.position(0, 0)
  canvas.style('z-index', '-1')
  canvas.elt.style.position = "fixed"
  colorMode(HSB)
  background(200,255,255)
  size = floor((width / 24 + height / 24) / 2)
  minCol = random(156, 196)
  maxCol = random(224, 255)
  rectMode(CENTER)
  h1 = createElement('h1', 'Code')
  h12 = createElement('h1', 'MonKeyz.foo()')
  h1.position(0, 0)
  h12.position(90, 0)
  h1.id('siteheader')
  h12.id('siteheader')
  h1.style('color', color(h, 255, 255))
  h12.style('color', 'white')
  h12.style('background', 'none')
  val = 156
  tempVal = val
  slider = createSlider(-16, 255, val);
  slider.position(width - 100, 18);
  slider.style('width', '80px');
  
}

function draw() {
  changeColor()
  switch (count % 6) {
    case 0:
      resize(32)
      break;
    case 1:
      resize(16)
      break;
    case 2:
      resize(8)
      break; 
    case 3:
      resize(4)
        break; 
    case 4:
      resize(8)
      break; 
    case 5:
      resize(16)
      break;
  }

  grow+= size/42
  if (count > 5) { count = 0 }
  
  for (var x = 0; x < width + size; x += size) {
    for (var y = 0; y < height + size; y += size) {
      var v = noise(x / height , y / width , shift / 32)
      h = map(v, 0, 1, minCol, maxCol)
      // alpha = map(grow, 0, size, 0, 1)      
      if (dist(mouseX, mouseY, x, y) <= (size + 1) / 2) {
        fill(h - 16, 255, 255/*, alpha*/)
      } else {
        fill(h, 255, 255/*, alpha*/)
      }
      noStroke()
      rect(x, y, grow, grow)
    }
  }
  h1.style('color', color(h, 255, 255))
  shift += size/512
}

function changeColor() {
  val = slider.value()
  if (val != tempVal) {
    background(minCol+50,255,255)
    tempVal = val
   }
   minCol = val
   maxCol = val+100
}

function resize(factor) {
  size = floor((width / factor + height / factor) / 2)
  if (grow > size) {count++,grow = 0}
}
