class Obstacle extends Rectangle {

  constructor(snake, screen, size) {
    super(-size, -size, size, size)

    this.snake = snake
    this.size = size
    this.background = '#55f'
    this.respawn(screen)
  }

  respawn(screen) {
    let percent = Math.random() * 100

    if(percent <= 10) {
      this._setRandomPosition()
      this._setRespawn(5000)
    } else {
      this.x = -this.size
      this.y = -this.size
      this._setRespawn(800)
    }
  }

  _setRandomPosition() {
    let snake = this.snake
    let minDistance = this.size * 4

    switch(snake.direction) {
      case 'right':
        this.x = Position.getRandomPoint(snake.x + minDistance, screen.width, this.size)
        this.y = snake.y
        break
      case 'left':
        this.x = Position.getRandomPoint(0, screen.width - (snake.x - minDistance), this.size)
        this.y = snake.y
        break
      case 'up':
        this.x = snake.x
        this.y = Position.getRandomPoint(0, screen.height - (snake.y + minDistance), this.size)
        break
      case 'down':
        this.x = snake.x
        this.y = Position.getRandomPoint(snake.y + minDistance, screen.height, this.size)
        break
    }
  }

  _setRespawn(millis) {
    if(this._timeoutRespawn) {
      clearTimeout(this._timeoutRespawn)
      this._timeoutRespawn = null
    }

    this._timeoutRespawn = setTimeout(() => {
      this.respawn(screen)
    }, millis)
  }

}