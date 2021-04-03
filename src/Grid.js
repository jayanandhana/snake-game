import React from "react"
import "./styles.css"


class Grid extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            keyPressed: false,
            emoji: "👶"
        }
    }

    onKeyPress = (event) => {
        const { getKey } = this.props;
        getKey(event.key);
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyPress)
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyPress)
    }
    
    UNSAFE_componentWillUpdate() {
        let new_emoji = "👶"
        let current_score = this.props.score
        if( current_score < 5){
            new_emoji = "👦"
        }
        else if( current_score < 10){
            console.log("here")
            new_emoji = "😯"
        }
        else if( current_score < 15){
            new_emoji = "😲"
        }
        else if( current_score < 20){
            new_emoji = "😱"
        }
        else if( current_score < 30){
            new_emoji = "👨"
        }
        else if( current_score < 40){
            new_emoji = "🔥"
        }
        else if( current_score < 50){
            new_emoji = "🤠"
        }
        else if( current_score < 75){
            new_emoji = "🤩"
        }
        else if( current_score > 74){
            new_emoji = "🦸‍♂️"
        }
        if(this.state.emoji !== new_emoji){
            this.setState((prevState) =>{
                return {
                    emoji: new_emoji
                }
            })
        }
    }

    render(){
        const cells = []
        const snake = this.props.snake
        for(let i = 0; i< snake.length;i++){
            const x = snake[i][0] + 1
            const y = snake[i][1] + 1
            cells.push(<div key = {i} id = {i} className = "grid-item" style = {{gridColumnStart:y, gridColumnEnd:y+1, gridRowStart: x, gridRowEnd: x+1}}>{i}</div>)
        } 
        const food = this.props.food
        
        return (
            <div className= "game">
                <h2>Snake game</h2>
                <h2 className = "emoji">{this.state.emoji}</h2>
                <h2 className= "score-board">Score: {this.props.score}</h2>
                <div className = "grid-container">
                    {cells}
                    <div key = {1000} id = {1000} style = {{gridColumnStart:food[1]+1,gridColumnEnd: food[1]+2, gridRowStart: food[0]+1, gridRowEnd: food[0]+2}} >O</div>
                </div>
                <h4 className = "info">The snake will not die or grow</h4>
            </div>
        )
    }
}
export default Grid