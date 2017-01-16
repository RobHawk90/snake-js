class Snake extends Rectangle {

  constructor(x, y, size) {
    super(x * size, y * size, size, size)

    this.size = size
    this.blocksX = x + 3
    this.blocksY = y
    this.body = [{blocksX: x + 2, blocksY: y}, {blocksX: x + 1, blocksY: y}]
    this.controller = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight'
    }
  }

  getHeadCopy() {
    let size = this.size

    return {
      blocksX: this.blocksX,
      blocksY: this.blocksY,
      x: this.blocksX * size,
      y: this.blocksY * size,
      width: size,
      height: size
    }
  }

  getSize() {
    return this.body.length
  }

  input(event) {
    let config = this.controller
    switch(event.key) {
      case config.up:
        if(this.direction != 'down')
          this.nextDirection = 'up'
        break
      case config.down:
        if(this.direction != 'up')
          this.nextDirection = 'down'
        break
      case config.left:
        if(this.direction != 'right')
          this.nextDirection = 'left'
        break
      case config.right:
        if(this.direction != 'left')
          this.nextDirection = 'right'
        break
    }
  }

  draw(screen) {
    this.move(this.nextDirection)

    let size = this.size

    let context = screen.context
    context.fillStyle = this.background

    this.body.forEach(block => {
      let x = block.blocksX * size
      let y = block.blocksY * size
      context.fillRect(x, y, size, size)
    })

    super.draw(screen)
  }

  move(direction = '') {
    if(this.frozen) return

    this.direction = direction

    let head = this.getHeadCopy()

    switch(direction) {
      case 'up':
        this.blocksY--
        break
      case 'down':
        this.blocksY++
        break
      case 'left':
        this.blocksX--
        break
      case 'right':
        this.blocksX++
        break
      default:
        return
    }

    this.body.pop()
    this.body.unshift(head)
    this.updatePosition()
  }

  wormhole(side) {
    if(side.right) {
      this.blocksX = 0
      this.x = 0
    }

    if(side.left) {
      this.blocksX = screen.width / this.size
      this.x = screen.width
    }

    if(side.top) {
      this.blocksY = screen.height / this.size
      this.y = screen.height
    }

    if(side.bottom) {
      this.blocksY = 0
      this.y = 0
    }
  }

  small(size) {
    let actualSize = this.getSize()
    let newSize = actualSize - size

    if(newSize > 0)
      this.body.splice(newSize, actualSize)
  }

  updatePosition() {
    this.x = this.blocksX * this.size
    this.y = this.blocksY * this.size
  }

  freeze(millis) {
    this.frozen = true
    setTimeout(() => this.frozen = false, millis)
  }

  onEat(food, callback) {
    let head = this.getHeadCopy()
    this.onCollides(food, () => {
      this.body.unshift(head)
      callback()
    })
  }

  onSelfBite(callback) {
    //i = 1 to ignore head's position
    for(let i = 1; i < this.getSize(); i++)
      this.onCollides(this.body[i], callback)
  }

}
