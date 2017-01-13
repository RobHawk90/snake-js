class ProgressBar extends Screen {

  constructor(screen) {
    super(screen.x, screen.y + screen.height + 20, screen.width, 20)

    let progress = new Text()
    progress.center(this)

    let bar = new Rectangle(0, 0, 0, this.height)
    bar.background = '#7f7'

    this.progress = progress
    this.bar = bar
  }

  update(percent) {
    this.clear()

    let progress = Math.round(percent * 100)

    this.progress.text = `${progress}%`
    this.progress.draw(this)

    this.bar.width = this.width * percent
    this.bar.draw(this)
  }

}