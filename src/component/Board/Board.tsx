'use client';

import { BoardIndex, SquareData } from "@/interface";
import { CSSProperties } from "react";
import Square from "./Square";

interface BoardProps {
    onClick(index: BoardIndex): void;
    data: SquareData[][];
}

export function Board(props: BoardProps){
    const style: CSSProperties = {
        border: '3px solid black',
        padding: 20,
        backgroundColor: 'yellow',
        display: 'grid',
        gridTemplateColumns: `repeat(${props.data[0].length}, auto)`,
        maxHeight: 'calc(100vh - 40px)', // 不要超出畫面高度
        overflow: 'auto',
    }
    return (
        <div style={style}>
            {props.data.map((row, rowIndex)=>{
                return (
                    row.map((col, colIndex)=>{
                        return <Square 
                            data={col} 
                            onClick={()=> props.onClick({row: rowIndex, col: colIndex})}
                            key={`${rowIndex}, ${colIndex}`}
                        />
                    })
                )
            })}
        </div>
    )

}
export default  Board;