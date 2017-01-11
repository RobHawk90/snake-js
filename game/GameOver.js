class GameOver extends Text {

  constructor(size, background) {
    super('', size)

    this.background = background
  }

  show(screen, text) {
    this.text = text

    let context = screen.context
    context.fillStyle = this.background ? this.background : screen.background
    context.fillRect(0, 0, screen.width, screen.height)

    super.center(screen)
    super.draw(screen)
  }

}
