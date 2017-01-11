class Painter {

  constructor() {
    this.sprites = []
  }

  pick(... sprites) {
    sprites.forEach(sprite => this.sprites.push(sprite))
    return this
  }

  controlSpritesOn(action) {
    document.addEventListener(action, event => {
      this.sprites.forEach(sprite => sprite.input(event))
    })
    return this
  }

  paint(screen, callback) {
    screen.show()

    this.loop = setInterval(() => {
      screen.clear()
      this.sprites.forEach(sprite => sprite.draw(screen))
      callback()
    }, 100)
  }

  stopPainting() {
    clearInterval(this.loop)
  }
}
