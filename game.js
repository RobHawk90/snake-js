let screen = new Screen(100, 100, 200, 200)
let snake = new Snake(1, 1, 10)
let food = new Food(screen, 10)
let score = new Score(20)
let lose = new GameOver(30, 'You lose.').background('rgba(150, 0, 0, 0.5)')
let win = new GameOver(30, 'You win!').background('rgba(0, 150, 0, 0.5)')

let painter = new Painter()

painter.pick(score, food, snake).paint(screen, () => {

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

  if(score.points == 10){
    win.show(screen)
    painter.stopPainting()
  }

})
