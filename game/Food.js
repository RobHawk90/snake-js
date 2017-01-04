class Food extends Rectangle {

  constructor(screen, size) {
    super(-size, -size, size, size) // showing out screen until respawn

    this.size = size
    this.background = '#f99'
    this.respawn(screen)
  }

  respawn(screen) {
    this.x = this.getRandomPoint(screen.width)
    this.y = this.getRandomPoint(screen.height)
    this._setRespawn(5000)
  }

  getRandomPoint(max) {
    let point = Math.floor(Math.random() * max)
    let outfit = point % this.size
    return point - outfit
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
