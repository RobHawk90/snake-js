class Screen {

  constructor(x, y, width, height, align) {
    let canvas = document.createElement('canvas')
    canvas.style.position = 'absolute'
    canvas.style.border = '1px solid black'

    this._canvas = canvas
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.align = align
  }

  set align(type) {
    if(type == 'center') {
      this.x = (window.innerWidth / 2) - (this.width / 2)
      this.y = (window.innerHeight / 2) - (this.height / 2)
    }
  }

  set x(x) {
    this._x = x
    this._canvas.style.left = `${x}px`
  }

  get x() {
    return this._x
  }

  set y(y) {
    this._y = y
    this._canvas.style.top = `${y}px`
  }

  get y() {
    return this._y
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

  get background() {
    return this._background
  }

  set background(hexColor) {
    this._background = hexColor
    this._canvas.style.background = hexColor
  }

  show() {
    document.body.appendChild(this._canvas)
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  onOut(sprite, callback) {
    let right = sprite.x >= this.width
    let left = sprite.x < 0
    let top = sprite.y < 0
    let bottom = sprite.y >= this.height

    if(right || left || top || bottom)
      callback({right: right, left: left, top: top, bottom: bottom})
  }
}
