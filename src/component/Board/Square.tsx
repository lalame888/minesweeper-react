'use client';

import { SquareData } from "@/interface";
import { CSSProperties } from "react";

interface SquareProps {
    onClick(): void;
    data: SquareData;
}

export function Square(props: SquareProps){
    const style: CSSProperties = {
        border: '1px solid black',
        backgroundColor: 'lightblue',
        userSelect: 'none',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
    }
    return (
        <div style={style}>{props.data.value}</div>
    )

}
export default  Square;