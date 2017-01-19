class Snake extends Rectangle {

  constructor(x, y, size) {
    super(x * size, y * size, size, size)

    this.imgHeadRight = document.createElement('img')
    this.imgHeadLeft = document.createElement('img')
    this.imgHeadUp = document.createElement('img')
    this.imgHeadDown = document.createElement('img')
    this.imgTailRight = document.createElement('img')
    this.imgTailLeft = document.createElement('img')
    this.imgTailUp = document.createElement('img')
    this.imgTailDown = document.createElement('img')
    this.imgBodyTopRight = document.createElement('img')
    this.imgBodyTopLeft = document.createElement('img')
    this.imgBodyBottomRight = document.createElement('img')
    this.imgBodyBottomLeft = document.createElement('img')
    this.imgBodyHorizontal = document.createElement('img')
    this.imgBodyVertical = document.createElement('img')

    this.imgHeadRight.setAttribute('src', 'img/snake_head_right.png')
    this.imgHeadLeft.setAttribute('src', 'img/snake_head_left.png')
    this.imgHeadUp.setAttribute('src', 'img/snake_head_up.png')
    this.imgHeadDown.setAttribute('src', 'img/snake_head_down.png')
    this.imgTailRight.setAttribute('src', 'img/snake_tail_right.png')
    this.imgTailLeft.setAttribute('src', 'img/snake_tail_left.png')
    this.imgTailUp.setAttribute('src', 'img/snake_tail_up.png')
    this.imgTailDown.setAttribute('src', 'img/snake_tail_down.png')
    this.imgBodyTopRight.setAttribute('src', 'img/snake_body_top_right.png')
    this.imgBodyTopLeft.setAttribute('src', 'img/snake_body_top_left.png')
    this.imgBodyBottomRight.setAttribute('src', 'img/snake_body_bottom_right.png')
    this.imgBodyBottomLeft.setAttribute('src', 'img/snake_body_bottom_left.png')
    this.imgBodyHorizontal.setAttribute('src', 'img/snake_body_horizontal.png')
    this.imgBodyVertical.setAttribute('src', 'img/snake_body_vertical.png')

    this.size = size
    this.body = [{blocksX: x + 3, blocksY: y, img: this.imgHeadRight}, {blocksX: x + 2, blocksY: y, img: this.imgBodyHorizontal}, {blocksX: x + 1, blocksY: y, img: this.imgTailRight}]

    this.controller = {
      up: 'ArrowUp',
      down: 'ArrowDown',
      left: 'ArrowLeft',
      right: 'ArrowRight'
    }
  }

  getHeadCopy() {
    let head = this.body[0]
    let size = this.size

    return {
      blocksX: head.blocksX,
      blocksY: head.blocksY,
      x: head.blocksX * size,
      y: head.blocksY * size,
      width: size,
      height: size,
      img: this.img
    }
  }

  getTailCopy() {
    let tail = this.body[this.body.length - 1]
    let size = this.size

    return {
      blocksX: tail.blocksX,
      blocksY: tail.blocksY,
      x: tail.blocksX * size,
      y: tail.blocksY * size,
      width: size,
      height: size,
      img: this.img
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

    let context = screen.context

    this.body.forEach(block => this.drawBlock(context, block))
  }

  drawBlock(context, block) {
    let size = this.size
    let x = block.blocksX * size
    let y = block.blocksY * size
    context.fillStyle = '#000'
    //context.fillRect(x, y, size, size)
    context.drawImage(block.img, x, y)
  }

  move(direction = '') {
    if(this.frozen) return

    let newHead = this.getHeadCopy()

    switch(direction) {
      case 'up':
        newHead.blocksY--
        newHead.img = this.imgHeadUp
        if(this.direction == 'right')
          this.img = this.imgBodyBottomRight
        else if(this.direction == 'left')
          this.img = this.imgBodyBottomLeft
        else
          this.img = this.imgBodyVertical
        break
      case 'down':
        newHead.blocksY++
        newHead.img = this.imgHeadDown
        if(this.direction == 'right')
          this.img = this.imgBodyTopRight
        else if(this.direction == 'left')
          this.img = this.imgBodyTopLeft
        else
          this.img = this.imgBodyVertical
        break
      case 'left':
        newHead.blocksX--
        newHead.img = this.imgHeadLeft
        if(this.direction == 'up')
          this.img = this.imgBodyTopRight
        else if(this.direction == 'down')
          this.img = this.imgBodyBottomRight
        else
          this.img = this.imgBodyHorizontal
        break
      case 'right':
        newHead.blocksX++
        newHead.img = this.imgHeadRight
        if(this.direction == 'up')
          this.img = this.imgBodyTopLeft
        else if(this.direction == 'down')
          this.img = this.imgBodyBottomLeft
        else
          this.img = this.imgBodyHorizontal
        break
      default:
        return
    }

    this.body[0].img = this.img

    this.body.pop()
    this.body.unshift(newHead)
    this.direction = direction
    this.updatePosition(newHead)

    let tail = this.body[this.body.length - 1]
    let block = this.body[this.body.length - 2]

    if(block.blocksX > tail.blocksX)
      tail.img = this.imgTailRight
    else if(block.blocksX < tail.blocksX)
      tail.img = this.imgTailLeft
    else if(block.blocksY > tail.blocksY)
      tail.img = this.imgTailDown
    else if(block.blocksY < tail.blocksY)
      tail.img = this.imgTailUp
  }

  wormhole(side) {
    let head = this.body[0]

    if(side.right) {
      head.blocksX = 0
      head.x = 0
    }

    if(side.left) {
      head.blocksX = screen.width / this.size
      head.x = screen.width
    }

    if(side.top) {
      head.blocksY = screen.height / this.size
      head.y = screen.height
    }

    if(side.bottom) {
      head.blocksY = 0
      head.y = 0
    }
  }

  small(size) {
    let actualSize = this.getSize()
    let newSize = actualSize - size

    if(newSize >= 3)
      this.body.splice(newSize, actualSize)
  }

  updatePosition(head) {
    this.x = head.blocksX * this.size
    this.y = head.blocksY * this.size
  }

  freeze(millis) {
    this.frozen = true
    setTimeout(() => this.frozen = false, millis)
  }

  onEat(food, callback) {
    let tail = this.getTailCopy()
    this.onCollides(food, () => {
      this.body.push(tail)
      callback()
    })
  }

  onSelfBite(callback) {
    //i = 1 to ignore head's position
    for(let i = 1; i < this.getSize(); i++)
      this.onCollides(this.body[i], callback)
  }

}
