import React, { useEffect, useState } from "react";
import { IGrid } from "../../models/models";
import { showGrid } from '../../utils/index';
import { initBoard } from "../../utils";
import { BoardPanel } from "../panels/BoardPanel/BoardPanel";
import { HeaderPanel } from "../panels/HeaderPanel/HeaderPanel";
import './gameSapper.css'

export function GameSapper() {
    const [statusGame, setStatusGame] = useState('🙂');
    const [grid, setGrid] = useState(() => initBoard(16, 16, 40));
    const [isTimeActive, setIsTimeActive] = useState(false);
    const [time, setTime] = useState(0);
    const [bombScore, setBombScore] = useState(40);

    useEffect(() => {
        var interval: NodeJS.Timeout | undefined;
    
        if (isTimeActive) {
          interval = setInterval(() => {
            setTime(seconds => seconds + 1);
          }, 1000);
        }
        if ((!isTimeActive && time !== 0) || time >= 2400) {
            const openedGrid = showGrid(grid);
            setGrid(openedGrid);
            setStatusGame('🙁');
            clearInterval(interval);
        }
    
        return () => clearInterval(interval);
    }, [isTimeActive, time]);
    
    const resetGame = ()=> {
        setStatusGame('🙂');
        setGrid(initBoard(16, 16, 40));
        setBombScore(40);

        setTime(0);
        setIsTimeActive(false);
    };

    const startGame = (arr:IGrid[][]) => {
        setStatusGame('🙂');
        setGrid(arr);
        console.log(arr)
        setBombScore(40);

        setTime(0);
        setIsTimeActive(true);
      }

    useEffect(() => {
        if (statusGame === '😎' || statusGame ==='🙁') {
            setIsTimeActive(false);
        }
    }, [statusGame]);

    return (
    <>
        <HeaderPanel
            timer={time} 
            score={bombScore} 
            onResetGame={resetGame} 
            statusGame={statusGame} 
        />
        <BoardPanel
            statusGame={statusGame}
            setStatusGame={setStatusGame}
            grid={grid}
            setGrid={setGrid}
            bombScore={bombScore}
            setBombScore={setBombScore}
            startGame = {startGame}
            flag = {isTimeActive}
        />
    </>
    )
}