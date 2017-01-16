class Rectangle extends Sprite {

  constructor(x, y, width, height) {
    super()

    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.background = '#000'
  }

  set image(src) {
    let img = document.createElement('img')
    img.setAttribute('src', src)
    this._img = img
    this._imgSrc = src
  }

  get image() {
    return this._imgSrc
  }

  draw(screen) {
    let context = screen.context

    if(this._img) {
      context.drawImage(this._img, this.x, this.y)
      return
    }

    context.fillStyle = this.background
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  onCollides(sprite, callback) {
    let centerX = this.x + (this.width / 2)
    let centerY = this.y + (this.height / 2)
    let collidesX = centerX > sprite.x && centerX < (sprite.x + sprite.width)
    let collidesY = centerY > sprite.y && centerY < (sprite.y + sprite.height)

    if(collidesX && collidesY && callback)
      callback()
  }

}
