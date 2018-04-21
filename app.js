





var redirectLength = 112,
    redirect = []
for (let i = 0; i < redirectLength; i++) redirect.push(i)
redirect.sort(function () {return Math.random() - 0.5})


function blast (x, max) {
  var offset = max % redirectLength,
      chunk = x - offset,
      blockLength = Math.floor(chunk/redirectLength)
    

  if (x < offset) {
    return x
  }
  else {
    return offset + (blockLength * redirectLength) + redirect[chunk % redirectLength]
  }
}






function App () {

  this.dotLength = 0;
  this.windowRect = document.body.getBoundingClientRect()
  
  // Init slider
  this.slider = new SliderCtrl(3000, this.start.bind(this))
  document.body.appendChild(this.slider.el)

  this.grid = new Grid(4, 8)
  document.body.appendChild(this.grid.el);

  this.summary = new SummaryCtrl(this.retry.bind(this))
  document.body.appendChild(this.summary.el)

  // Binded listeners
  this.scrollBinded = this.scroll.bind(this)
}

App.prototype.start = function (dotLength) {
  this.dotLength = dotLength
  this.duration = dotLength * 3
  this.starter = Date.now()
  this.counter = 0
  
  this.map = new Mapper(dotLength);
  this.grid.setup(dotLength, this.windowRect.width)

  this.scrollLength = this.windowRect.height + (this.grid.lines * this.grid.unitSize)

  this.scroll()
}

App.prototype.scroll = function () {
  var ratio = (Date.now() - this.starter) / this.duration

  if (ratio > 1) {
    this.scrollEnd()
    return
  }
  var toReach = Math.floor(ratio * this.map.size);

  var dot
  for (; this.counter < toReach; this.counter++) {
    dot = blast(this.counter, this.dotLength)
    this.grid.setDot(dot, this.map.stack[dot])
  }
  
  window.scrollTo(0, this.scrollLength * ratio)
  requestAnimationFrame(this.scrollBinded)
}

App.prototype.scrollEnd = function () {
  this.summary.set(this.dotLength, this.map.posPins)
  this.summary.show();
  window.scrollTo(0, 9999999)
}

App.prototype.retry = function () {
  window.scrollTo(0, 0)
  this.summary.hide();
}

new App ()