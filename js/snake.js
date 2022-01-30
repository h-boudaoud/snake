import {getInputDirection} from "./inputSegment.js";
import {GRID_COL_SIZE, GRID_ROW_SIZE} from "./grid.js";

let SnakeBody = [
    {x:9,y:13},
    {x:8,y:13}
]
export const SNAKE_SPEES =  (snakeBody=SnakeBody)=>{
    if (snakeBody.length<5) {
        return 5
    }
    if (snakeBody.length<10) {
        return 10
    }
    if (snakeBody.length<30) {
        return 20
    }
    return 30
}
export function start(){
    SnakeBody=[
        {x:9,y:13},
        {x:8,y:13}
    ]
}
export function update(){

    for(let i = SnakeBody.length -2;i>-1;i--){
        SnakeBody[i+1]= {...SnakeBody[i]}
    }

    SnakeBody[0].y +=getInputDirection().y
    SnakeBody[0].x +=getInputDirection().x



    SnakeBody[0].y =  SnakeBody[0].y % (GRID_COL_SIZE)
    SnakeBody[0].x =  SnakeBody[0].x % (GRID_ROW_SIZE)
    SnakeBody[0].y =  SnakeBody[0].y === 0 ? GRID_COL_SIZE :SnakeBody[0].y
    SnakeBody[0].x =  SnakeBody[0].x === 0 ? GRID_COL_SIZE :SnakeBody[0].x

    //
    // SnakeBody[0].x =SnakeBody[0].x<=0
    //     ?GRID_ROW_SIZE
    //     :SnakeBody[0].x>=GRID_ROW_SIZE?0:SnakeBody[0].x

    //console.log('SnakeBody[0] : ',SnakeBody[0])
    //console.log('SnakeBody[1] : ',SnakeBody[1]||null)

}
export function draw(gameBoard){
    SnakeBody.forEach(segment =>{
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.append(snakeElement)
    })
}
export function checkDeath(){
    return SnakeBody.some((el,index)=> index !==0 && el.x===SnakeBody[0].x && el.y===SnakeBody[0].y)
}
export function on(segment){
    return SnakeBody.some(el=> el.x===segment.x && el.y===segment.y)
}
export function expend(segment=SnakeBody[1]){
    SnakeBody[SnakeBody.length]=segment
}