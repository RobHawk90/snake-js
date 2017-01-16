let goalPoints = 50
let size = 20

let screen = new Screen(0, 0, 400, 400, 'center')
let snake = new Snake(0, 3, size)
let food = new Food(screen, size)
let ice = new Obstacle(snake, screen, size)
let bomb = new Obstacle(snake, screen, size)
let poison = new Obstacle(snake, screen, size)
let score = new Score(20)
let lose = new GameOver(60, 'rgba(150, 0, 0, 0.5)')
let win = new GameOver(60, 'rgba(0, 150, 0, 0.5)')
let author = new Text('by RobHawk', 10)
let progress = new ProgressBar(screen)

progress.show()

screen.background = '#7f7'

author.align = 'right'
author.x = screen.width
author.y = screen.height

poison.image = 'img/poison.png'
bomb.image = 'img/bomb.png'
ice.image = 'img/ice.png'

let painter = new Painter()

painter.pick(author, score, food, ice, poison, bomb, snake)
.controlSpritesOn('keydown')
.paint(screen, () => {

  if(score.points == goalPoints) {
    win.show(screen, 'You win!')
    painter.stopPainting()
  }

  screen.onOut(snake, side => {
    snake.wormhole(side)
  })

  snake.onEat(food, () => {
    score.increase()
    food.respawn(screen)
    progress.update(score.points / goalPoints)
  })

  snake.onSelfBite(() => {
    lose.show(screen, 'Aaaautch!')
    painter.stopPainting()
  })

  snake.onCollides(poison, () => {
    snake.small(5)
    score.points = snake.getSize()
    progress.update(score.points / goalPoints)
  })

  snake.onCollides(bomb, () => {
    lose.show(screen, 'BOOOM!')
    painter.stopPainting()
  })

  snake.onCollides(ice, () => {
    snake.freeze(4000)
  })

})
