class Painter {

  constructor() {
    this.sprites = []

    document.addEventListener('keydown', event => {
      this.sprites.forEach(sprite => sprite.input(event))
    })
  }

  pick(... sprites) {
    sprites.forEach(sprite => this.sprites.push(sprite))

    return this
  }

  paint(screen, callback) {
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
