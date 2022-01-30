console.log("snake");
let btn = document.getElementById("start")
const gameBoard = document.getElementById('snakeGame')
const scoreSpan = document.getElementById('scoreSpan')
const lastScoresDiv = document.getElementById('LastScores')
let lastRenderTime = 0
let lastFoodTime = 0;
let start = false
const scores =[]
import {
    checkDeath as checkDeathSnake,
    draw as drawSnake,
    expend as expendSnake,
    on as onSnake,
    SNAKE_SPEES,
    start as startSnake,
    update as updateSnake
} from './snake.js'
import {draw as drawFood, food, update as updateFood} from './food.js'

document.getElementById('start')
    .addEventListener('click', (e) => {
        start = !start
        btn.innerHTML = start ? "Pause" : 'Start'
        window.requestAnimationFrame(main)
    })


function time() {

    let d = new Date()
    return d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()+ ' -- '+
        d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
}

function update(currentTime) {
    const isCheckDeathSnake = checkDeathSnake()
    if (!start) {

        return
    }
    if (isCheckDeathSnake) {
        const scoreElement = document.createElement('div')
        scoreElement.innerHTML =time()+" : "+scoreSpan.innerText
        lastScoresDiv.append(scoreElement)
        start = false
        btn.innerHTML = start ? "Pause" : 'Start'
        confirm("Game Over\nnew game ?")
        start = false
        startSnake()
        score()
        return
    }
    updateSnake()
    //console.log('food', food)
    if (onSnake(food)) {
        const secondSinceLastFood = (currentTime - lastFoodTime) / 1000
        let scoreValue = (secondSinceLastFood> 10? 1 : 10-Math.floor(secondSinceLastFood)) * SNAKE_SPEES()
        lastFoodTime = currentTime
        console.log('Score : ', scoreValue, '\tsecondSinceLastRender :', secondSinceLastFood)
        expendSnake()
        updateFood()
        score(scoreValue)
    }


}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function score(addScore) {
    scoreSpan.innerHTML = addScore>0 ? parseInt(scoreSpan.innerText) + addScore:0
}

function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000
    console.log("SNAKE_SPEES :", SNAKE_SPEES())
    if (secondSinceLastRender < 1 / SNAKE_SPEES()) return

    lastRenderTime = currentTime
    update(currentTime)
    draw()
}