class Score extends Text {

  constructor(size, color) {
    super('', size, color)

    this.points = 2
  }

  increase(points = 1) {
    this.points += points
  }

  decrease(points = 1) {
    this.points -= points
  }

  draw(screen) {
    this.text = `size ${this.points} m`
    super.draw(screen)
  }

}
