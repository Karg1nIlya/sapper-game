import React from "react";
import { IGrid } from "../../models/models";
import './gameButton.css'

interface IGameButton {
    col: IGrid,
    i: number,
    j: number,
    onLClick: (e:any, i: number, j:number)=>void,
    onRClick: (e:any, i: number, j:number)=>void,
    changeStatusGame: (str:string) => void
}

export function GameButton({col, i, j, onLClick, onRClick, changeStatusGame}: IGameButton) {
  const classButtonArr = ['game-button', 'disable-game-button']  
  const getValue = (cellData:IGrid) => {
        const { isMine, isOpen, neighbours, flagIndex } = cellData;
        if (!isOpen) return flagIndex ? (flagIndex === 1 ? '🚩' : '❓') : '';
        if (isMine) return '💣';
        if(isOpen && flagIndex === 1 && !isMine) return '⚠️'
        if (neighbours) return neighbours;
    };

    const getColor = (neighbour: number) => {
        switch (neighbour) {
          case 1:
            return '#1e91fe';
          case 2:
            return '#359139';
          case 3:
            return '#f00b51';
          case 4:
            return '#014da3';
          case 5:
            return '#541f3f';
          case 6:
            return '#02b8b8';
          case 7:
            return '#171717';
          case 8:
            return '#f8f9fb';
          default:
            return '';
        }
    };

    const getBacgroundColor = ()=> {
      if(col.isBoom) {
        return 'red'
      }
      return ''
    }

    return (
        <>
        <div 
        className={col.isOpen ? classButtonArr[1] : classButtonArr[0]}
        style={{
            color: getColor(col.neighbours),
            backgroundColor: getBacgroundColor()
        }}
        data-dimension={`${i}-${j}`}
        onMouseUp={(e) => {
          if(e.button === 0) {
            changeStatusGame('🙂')
            onLClick(e, i, j)
          }
        }}
        onMouseDown={()=>changeStatusGame('😮')}
        onContextMenu={e => onRClick(e, i, j)}
        >
            {getValue(col)}
        </div>
        </>
    )
}