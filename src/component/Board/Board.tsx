import { BoardIndex, ClickDirect, SquareData } from "@/interface";
import { CSSProperties } from "react";
import Square from "./Square";

interface BoardProps {
    onClick(index: BoardIndex, direct: ClickDirect): void;
    data: SquareData[][];
}

export function Board(props: BoardProps){
    const style: CSSProperties = {
        border: '3px solid #1d71c8',
        borderRadius: 10,
        backgroundColor: '#1d71c8',
        flexWrap: 'nowrap',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 40px)', // 不要超出畫面高度
        maxWidth: 'auto',
        overflow: 'auto',
        padding: 5,
    }
    return (
        <div style={style}>
            {props.data.map((row, rowIndex)=>{
                return (
                    <div key={rowIndex} style={{display: 'flex', flex: '1',
                }}>
                        {
                        row.map((col, colIndex)=>{
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

}
export default  Board;