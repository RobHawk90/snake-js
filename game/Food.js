class Food extends Rectangle {

  constructor(screen, size) {
    super(-size, -size, size, size) // showing out screen until respawn

    this.size = size
    this.background = '#f99'
    this.image = 'img/food.png'
    this.respawn(screen)
  }

  respawn(screen) {
    this.x = Position.getRandomPoint(0, screen.width, this.size)
    this.y = Position.getRandomPoint(0, screen.height, this.size)
    this._setRespawn(5000)
  }

  _setRespawn(millis) {
    this.background = '#f77'
    this._blink(millis * 0.6)

    if(this._timeoutRespawn) {
      clearTimeout(this._timeoutRespawn)
      this._timeoutRespawn = null
    }

    this._timeoutRespawn = setTimeout(() => {
      this.respawn(screen)
    }, millis)
  }

  _blink(millis) {
    this._toggleBackground()

    if(this._intervalBlink) {
      clearInterval(this._intervalBlink)
      this._intervalBlink = null
    }

    this._intervalBlink = setTimeout(() => {
      this._blink(100)
    }, millis)
  }

  _toggleBackground() {
    if(this.background == '#f00')
      this.background = '#f77'
    else
      this.background = '#f00'
  }

}
