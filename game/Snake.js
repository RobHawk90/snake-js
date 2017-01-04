class Snake extends Rectangle {

  constructor(x, y, size) {
    super(x, y, size, size)

    this.size = size
    this.body = [{blocksX: x + 3, blocksY: y}, {blocksX: x + 2, blocksY: y}, {blocksX: x + 1, blocksY: y}]
    this.controller = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight'
    }
  }

  getHead() {
    let head = this.body[0]
    let size = this.size

    return {
      blocksX: head.blocksX,
      blocksY: head.blocksY,
      x: head.blocksX * size,
      y: head.blocksY * size,
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
          this.direction = 'up'
        break
      case config.down:
        if(this.direction != 'up')
          this.direction = 'down'
        break
      case config.left:
        if(this.direction != 'right')
          this.direction = 'left'
        break
      case config.right:
        if(this.direction != 'left')
          this.direction = 'right'
        break
    }
  }

  draw(screen) {
    this.move(this.direction)

    let size = this.size

    let context = screen.context
    context.fillStyle = this.background

    this.body.forEach(block => {
      let x = block.blocksX * size
      let y = block.blocksY * size
      context.fillRect(x, y, size, size)
    })
  }

  move(direction = '') {
    let head = this.getHead()

    switch(direction) {
      case 'up':
        head.blocksY--
        break
      case 'down':
        head.blocksY++
        break
      case 'left':
        head.blocksX--
        break
      case 'right':
        head.blocksX++
        break
      default:
        return
    }

    this.body.pop()
    this.body.unshift(head)
    this.updatePosition()
  }

  small(size) {
    let actualSize = this.getSize()
    let newSize = actualSize - size

    if(newSize > 0)
      this.body.splice(newSize, actualSize)
  }

  updatePosition() {
    let head = this.getHead()
    this.x = head.x
    this.y = head.y
  }

  onEat(food, callback) {
    let head = this.getHead()
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
