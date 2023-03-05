import React from "react";
import { Board } from "../../boards/Board";
import './headerPanel.css'

interface IHeaderPanel {
    timer: number,
    score: number,
    onResetGame: ()=>void, 
    statusGame: string
}

export function HeaderPanel({timer, score, onResetGame, statusGame}: IHeaderPanel) {

    function getStr(num:number):string {
        let str = ''
        if(num<10) {
            str = '00'+String(num)
        }
        else if(num<100) {
            str = '0'+String(num)
        }
        else {
            str = String(num)
        }
        return str
    }

    return (
        <div className="header-game">
            <Board num={getStr(score)}/>
            <div className="start-game-btn" onClick={onResetGame}>
                {statusGame}
            </div>
            <div className="timer">
            <Board num={getStr(timer)}/>
        </div>
        </div>
    )
}