import { BoardIndex, ClickDirect, SquareData } from "@/interface";
import React, { CSSProperties } from "react";
import Square from "./Square";

interface BoardProps {
    onClick(index: BoardIndex, direct: ClickDirect): void;
    board: SquareData[][];
}

// 這邊一定要用React.memo 不然timer在跑的時候，底下的按鈕瘋狂render
export const Board = React.memo(function Board(props: BoardProps){
    const BoardStyle: CSSProperties = {
        flexWrap: 'nowrap',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 125px)', // 不要超出畫面高度
        maxWidth: 'auto',
        overflow: 'auto',
        padding: 5,
    }
    return (
        <div style={BoardStyle}>
                {props.board.map((row, rowIndex)=>{
                    return (
                        <div 
                            key={rowIndex} 
                            style={{display: 'flex', flex: '1'}}
                        >
                            {row.map((col, colIndex)=>{
                                return <Square 
                                    data={col} 
                                    onClick={(direct: ClickDirect)=> props.onClick({row: rowIndex, col: colIndex}, direct)}
                                    key={`${rowIndex}, ${colIndex}`}
                                />
                            })}
                        </div>
                    )
                })}
            </div>
    )
});
export default  Board;