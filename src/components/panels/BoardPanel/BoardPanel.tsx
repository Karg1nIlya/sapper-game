import React from "react";
import { newInitBoard } from "../../../utils";
import { produce } from 'immer';
import { showEmptyCells, showGridLose, showGridWin } from '../../../utils/index';
import './boardPanel.css'
import { GameButton } from "../../GameButton/GameButton";
import { IGrid } from "../../../models/models";

interface IBoardPanel {
    statusGame: string,
    setStatusGame: (status:string)=>void,
    grid: IGrid[][],
    setGrid: (arr:IGrid[][])=>void,
    bombScore: number,
    setBombScore: (num:number)=>void,
    startGame: (arr:IGrid[][])=> void,
    flag: boolean
}

const BoardPanel = React.memo((props:IBoardPanel) => {

    const {statusGame, setStatusGame, grid, setGrid, bombScore, setBombScore, startGame, flag} = props;
  
    const onLeftClick = (e: any, x: number, y:number) => {
      if ((grid[x][y].isOpen || grid[x][y].flagIndex > 0 || statusGame === '😎' || statusGame ==='🙁')) {
        return;
      }
      
      if(!flag) {        
        const gridTmp = newInitBoard(x,y)
        startGame(gridTmp)
        return 
      }

      const updatedGrid:IGrid[][] = produce(grid, (draft:any) => {
        Object.assign(draft[x][y], { isOpen: true });
        if (draft[x][y].isEmpty) {
          showEmptyCells(16, 16, x, y, draft);
        }
      });
  
      // Поражение
      if (updatedGrid[x][y].isMine) {
        const openedGrid = showGridLose(updatedGrid, x, y);
        setGrid(openedGrid);
        setStatusGame('🙁');
        return;
      }
  
      // Победа
      const hiddenGrid = updatedGrid.flat().filter((cell:IGrid) => !cell.isOpen);
      if (hiddenGrid.length === 40) {
        const finalGrid = showGridWin(updatedGrid);
        setGrid(finalGrid);
        setBombScore(0);
        setStatusGame('😎');
        return;
      }
  
      setGrid(updatedGrid);
    };
  
    const onRightClick = (e: any, x: number, y: number) => {
      e.preventDefault();
      if (grid[x][y].isOpen || statusGame === '😎' || statusGame ==='🙁') return;
  
      let mineCountPlaceholder = bombScore;
      const updatedGrid = produce(grid, (draft:any) => {
        draft[x][y].flagIndex = draft[x][y].flagIndex > 1 ? 0 : draft[x][y].flagIndex + 1;
  
        draft[x][y].flagIndex === 1 && (mineCountPlaceholder -= 1);
        draft[x][y].flagIndex === 2 && (mineCountPlaceholder += 1);
  
        setBombScore(mineCountPlaceholder);
      });
  
      setGrid(updatedGrid);
      changeStatusGame('🙂')
    };

    const changeStatusGame = (st:string) => {
      setStatusGame(st);
    }

    return (
    <>
        <div className="board-panel"  
          style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${16}, 1fr)`, //колонки
          gridTemplateRows: `repeat(${16}, 1fr)` //строки
      }}>
            {grid.map((row: IGrid[],i: number)=> 
                row.map((col: IGrid, j: number)=> (
                        <GameButton 
                            onLClick={(e, i, j) => onLeftClick(e, i, j)}
                            onRClick={(e, i, j) => onRightClick(e, i, j)}
                            changeStatusGame = {changeStatusGame}
                            key={`${i}-${j}`}
                            col={col}
                            i={i}
                            j={j}
                        />
                ))               
            )}
        </div>
    </>
    )
})

export {BoardPanel}