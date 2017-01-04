class Rectangle extends Sprite {

  constructor(x, y, width, height) {
    super()

    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.background = '#000'
  }

  draw(screen) {
    let context = screen.context
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
