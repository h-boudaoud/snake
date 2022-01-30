import {GRID_COL_SIZE, GRID_ROW_SIZE} from "./grid.js";



export let food = newFood()
function newFood(){
    return {
        x: Math.floor(Math.random() * (GRID_ROW_SIZE-1)+1),
        y: Math.floor(Math.random() * (GRID_ROW_SIZE-1)+1)
    }
}
export function update() {
        food = newFood()
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.append(foodElement)
}