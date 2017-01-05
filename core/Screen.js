class Screen {

  constructor(x, y, width, height) {
    let canvas = document.createElement('canvas')
    canvas.style.position = 'absolute'
    canvas.style.border = '1px solid black'
    canvas.style.left = `${x}px`
    canvas.style.top = `${y}px`

    this._canvas = canvas
    this.width = width
    this.height = height
    this.background = '#fff'
  }

  get context() {
    return this._canvas.getContext('2d')
  }

  get width() {
    return this._width
  }

  set width(width) {
    this._width = width
    this._canvas.setAttribute('width', width)
  }

  get height() {
    return this._height
  }

  set height(height) {
    this._height = height
    this._canvas.setAttribute('height', height)
  }

  show() {
    document.body.appendChild(this._canvas)
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
