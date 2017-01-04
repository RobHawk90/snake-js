class Text extends Sprite {

  constructor(text = '', size = 12, color = '#000') {
    super()

    this.text = text
    this.size = size
    this.color = color
    this.align = 'left'
    this.font = 'Comic Sans MS'
    this.x = 0
    this.y = size
  }

  center(screen) {
    this.x = screen.width / 2
    this.y = screen.height / 2
    this.align = 'center'

    return this
  }

  draw(screen) {
    let context = screen.context

    context.font = `${this.size}px ${this.font}`
    context.textAlign = this.align
    context.fillStyle = this.color
    context.fillText(this.text, this.x, this.y)
  }

}
