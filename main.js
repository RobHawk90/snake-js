let screen = new Screen(window.innerWidth/2 - 200, window.innerHeight/2 - 200, 400, 400)
let snake = new Snake(0, 3, 20)
let food = new Food(screen, 20)
let score = new Score(20)
let lose = new GameOver(60, 'You lose.').background('rgba(150, 0, 0, 0.5)')
let win = new GameOver(60, 'You win!').background('rgba(0, 150, 0, 0.5)')

let painter = new Painter()

painter.pick(score, food, snake)
.controlSpritesOn('keydown')
.paint(screen, () => {

  if(score.points == 30){
    win.show(screen)
    painter.stopPainting()
  }

  screen.onOut(snake, () => {
    lose.show(screen)
    painter.stopPainting()
  })

  snake.onEat(food, () => {
    score.increase()
    food.respawn(screen)
  })

  snake.onSelfBite(() => {
    snake.small(5)
    score.points = snake.getSize()
  })

})
