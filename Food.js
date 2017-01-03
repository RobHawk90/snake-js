class Food extends Rectangle {

  constructor(screen, size) {
    super(-size, -size, size, size)

    this.size = size
    this.background = '#f00'
    this.respawn(screen)
  }

  respawn(screen) {
    this.x = this.getRandomPoint(screen.width)
    this.y = this.getRandomPoint(screen.height)
  }

  getRandomPoint(max) {
    let point = Math.floor(Math.random() * max)
    let outfit = point % this.size
    return point - outfit
  }

}
