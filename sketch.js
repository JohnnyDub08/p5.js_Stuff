/* Dominic Florack 2020 */

var shift = 0
var size = 0
var grow = 0
var count = 0
var h
var minCol
var maxCol
var val
var tempVal


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
  canvas = createCanvas(windowWidth, windowHeight)
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
  slider = createSlider(-33, 255, 156);
  val = 156
  slider.position(width - 100, 18);
  slider.style('width', '80px');
  tempVal = val
}

function draw() {
  changeColor()
  switch (count % 3) {
    case 0:
      size = floor((width / 16 + height / 16) / 2)    
      break;
    case 1:
      size = floor((width / 8 + height / 8) / 2)
      break;
    case 2:
      size = floor((width / 4 + height / 4) / 2)
      grow = 0
      break; 
  }

  grow = shift * 8 % size + size/64
  //grow = shift*8 % size
  if (grow >= size) { grow = size }
  if (grow == size) { count++ }
  if (count > 2) { count = 0 }
  
  for (var x = 0; x < width + size; x += size) {
    for (var y = 0; y < height + size; y += size) {
      var v = noise(x / height , y / width , shift / 30)
      h = map(v, 0, 1, minCol, maxCol)
      //trans = map(grow, 0, size, 0, 1)      
      if (dist(mouseX, mouseY, x, y) <= (size + 1) / 2) {
        fill(h - 16, 255, 255)
      } else {
        fill(h, 255, 255)
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
