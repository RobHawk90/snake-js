class GameOver extends Text {

  constructor(size, text = '') {
    super(text, size)
  }

  background(color) {
    this.background = color

    return this
  }

  show(screen) {
    let context = screen.context
    context.fillStyle = this.background ? this.background : screen.background
    context.fillRect(0, 0, screen.width, screen.height)

    super.center(screen)
    super.draw(screen)
  }

}
