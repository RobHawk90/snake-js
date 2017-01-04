class Score extends Text {

  constructor(size, color) {
    super('', size, color)

    this.points = 3
  }

  increase(points = 1) {
    this.points += points
  }

  decrease(points = 1) {
    this.points -= points
  }

  draw(screen) {
    this.text = `size ${this.points}/30 m`
    super.draw(screen)
  }

}
