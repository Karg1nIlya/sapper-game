import React from 'react'
import "./app.css"
import { GameSapper } from './components/GameSapper/GameSapper'


function App() {
    return (
        <div className="container">
            <div className="box">
                <div className="box__wrapper">
                    <GameSapper></GameSapper>
                </div>
            </div>
            
        </div>
        
    )
}

export default App