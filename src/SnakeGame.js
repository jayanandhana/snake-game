import React from "react"
import Grid from "./Grid"

var interval
class SnakeGame extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            snake: [[1,1],[1,2],[1,3],[1,4]], // 
            length: 4,
            food: [0,0],
            score: 0,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    getKey = (key) =>{
        //console.log(key)
        //console.log(interval)
        if(interval){
            window.clearInterval(interval)
        }
        interval = setInterval(() => {
            if(key === "ArrowDown"){
                this.moveV(false)
            }
            else if(key === "ArrowUp"){
                this.moveV(true)
            }
            else if(key === "ArrowRight"){
                this.moveH(true)
            }
            else{
                this.moveH(false)
            }
            //console.log(this.state.snake)
            this.checkEaten()
        }, 125)
    }
    moveH = (right) => {
        let changed = false
        let toAdd = right ? -1:1
        this.setState(prevState => {
            let prev = prevState.snake
            if(!changed){
                prev.shift()
                let tail = prev[prev.length - 1]
                if (tail[1]-toAdd >= 0){
                    prev.push([tail[0],(tail[1]-toAdd)%10])
                }
                else{
                    prev.push([tail[0], tail[1]-toAdd + 10])
                }
                changed = true
            }
            return {
                snake: prev,
                ...prevState
            }
        })

    }
    moveV = (up) => {
        let changed = false
        let toAdd = up ? 1:-1
        this.setState(prevState => {
            let prev = [...prevState.snake]
            if(!changed){
                prev.shift()
                let tail = prev[prev.length - 1]
                if (tail[0]-toAdd >= 0){
                    prev.push([(tail[0]-toAdd)%10,tail[1]])
                }
                else{
                    prev.push([tail[0]-toAdd + 10, tail[1]])
                }
                changed = true        
            }           
            return {
                snake: prev,
            }
        })
        
    }
    playSound = () => {
        let audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg')
        audio.play()
    }
    putFood = () => {
        this.setState((prevState) => {
            const pastPosition = prevState.food
            const snake = prevState.snake
            let newPosition = [0,0]
            while(pastPosition[0] === newPosition[0] || newPosition[0] === 0 || newPosition[1] === 0 || pastPosition[1] === newPosition[1] || snake.includes(newPosition))
            {
                newPosition[0] = Math.floor(Math.random()*10)
                newPosition[1] = Math.floor(Math.random()*10)                
            }
            this.playSound()
            return {
                ...prevState,
                food: newPosition
            }
        })
    }
    increaseScore = () => {
        this.setState( prevState => {
            const newScore = prevState.score + 1
            return {
                ...prevState,
                score: newScore
            }
        })
    }
    checkEaten = () => {
        const food = this.state.food
        const head = this.state.snake[3]
        if (head[0] === food[0] && head[1] === food[1]){
            console.log("Burp...")
            this.putFood()
            this.increaseScore()
        }
    }
    render(){
        return (
            <Grid snake = {this.state.snake} food = {this.state.food} score = {this.state.score} getKey = {this.getKey}/>
        )
    }
} 

export default SnakeGame