class Screen {

  constructor(x, y, width, height) {
    let canvas = document.createElement('canvas')
    canvas.style.position = 'absolute'
    canvas.style.border = '1px solid black'
    canvas.style.left = `${x}px`
    canvas.style.top = `${y}px`
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    document.body.appendChild(canvas)

    this.context = canvas.getContext('2d')
    this.width = width
    this.height = height
    this.background = '#fff'
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  onOut(sprite, callback) {
    let outX = sprite.x < 0 || sprite.x >= this.width
    let outY = sprite.y < 0 || sprite.y >= this.height
    let out = outX || outY

    if(out && callback)
      callback()
  }
}
