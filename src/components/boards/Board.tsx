import React from "react";
import './boards.css'

interface ITimer {
    num: string
}

export function Board({num}: ITimer) {  
    return (
        <div className="board">
            {num.split('').map((el:string, i:number)=>{
                return (
                    <div className="board__number" key={i}>
                        {el}
                    </div>
                )
            })}
        </div>
    )
}