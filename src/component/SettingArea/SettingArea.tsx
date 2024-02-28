'use client';

import { GameConstructor, SquareData } from "@/interface";
import { CSSProperties } from "react";

interface SettingAreaProps {
    value: GameConstructor
    setValue(newVale: GameConstructor): void
}

export function SettingArea(props: SettingAreaProps){
    const style: CSSProperties = {
        border: '3px solid black',
        padding: 20,
        backgroundColor: 'blue',
        display: 'flex',
    }
    return (
        <div style={style}>
           
        </div>
    )

}
export default  SettingArea;