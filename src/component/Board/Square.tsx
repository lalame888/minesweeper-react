'use client';

import { SquareData, SquareStatus } from "@/interface";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";

interface SquareProps {
    onClick(): void;
    data: SquareData;
}

export function Square(props: SquareProps){
    const style: CSSProperties = {
        border: '1px solid black',
        fontFamily: 'monospace',
        userSelect: 'none',
        color: 'white',
        backgroundColor: '#155c9e',
        display: 'flex',
        width: '35px',
        height: '35px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        margin: 1,
        borderColor: '#8e9ba9',

    }
    const numberStyle: CSSProperties = {
        color: props.data.value === 1 ? 'white' : props.data.value === 2 ? '#65d60d':'#f9067b',
        backgroundColor: '#155c9e',
        borderColor: '#465565',
        boxShadow: 'rgb(0 0 0 / 10%) 1px -2px 1px 0px inset', // 立體陰影
    }
    const markStyle: CSSProperties = {
        backgroundColor: '#feeaf2',
        fontSize: '15px',
        color: 'red',
        boxShadow: 'rgba(255, 8, 8, 0.29) 0px -1px 3px 1px inset', // 紅色立體陰影
    }

    const blankStyle: CSSProperties = {
        backgroundColor: '#e2ecf7',
        borderColor: '#8e9ba9',
        boxShadow: 'rgb(126 182 247 / 29%) 1px -3px 3px 0px inset', // 灰色立體陰影
    }
    return (
        <div style={{...style, ...numberStyle}}>
            {props.data.value > 0 && props.data.value}
        </div>
    )
    if (props.data.status === SquareStatus['未開啟']) {
        return (
            <div style={{...style, ...blankStyle}}/>
        )
    } else if (props.data.status === SquareStatus['標記旗子']) {
        return (
            <div style={{...style, ...markStyle}}>
                <FontAwesomeIcon icon={faFlag}/>
            </div>
        )
    } else {
        // 開啟的
        if (!props.data.isMines) { // 是數字
            return (
                <div style={{...style, ...numberStyle}}>
                    {props.data.value > 0 && props.data.value}
                </div>
            )
            
        }
    }
    return (
        <div style={{...style, ...numberStyle}}>
            
            {props.data.value > 0 && props.data.value}
        </div>
    )

}
export default  Square;