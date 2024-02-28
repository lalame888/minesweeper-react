import { GameConstructor } from "@/interface";
import { CSSProperties, ChangeEvent } from "react";
import { Col, Form, Row } from "react-bootstrap";
import SettingRow from "./SettingRow";

interface SettingAreaProps {
    value: GameConstructor
    setValue(newVale: GameConstructor): void
}

export function SettingArea(props: SettingAreaProps){
    const style: CSSProperties = {
        border: '3px solid black',
        padding: 20,
        backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
    function onSettingChange(newValue: number, term: Exclude<keyof GameConstructor, 'initIndex'> ) {
        if (!isNaN(newValue) && newValue>0) {
            const newSetting = {...props.value}
            newSetting[term] = newValue;
            newSetting.minesNumber = Math.min(newSetting.minesNumber, newSetting.rowSize * newSetting.colSize - 1)
            props.setValue(newSetting)
        }
    }
    return (
        <div style={style}>
                <SettingRow
                    value={props.value.rowSize}
                    name={'直排數量'}
                    setValue={(newValue)=> onSettingChange(newValue, 'rowSize')}
                    max={300}
                />
                <SettingRow
                    value={props.value.colSize}
                    name={'橫排數量'}
                    setValue={(newValue)=> onSettingChange(newValue, 'colSize')}
                    max={300}
                />
                <SettingRow
                    value={props.value.minesNumber}
                    name={'地雷數量'}
                    setValue={(newValue)=> onSettingChange(newValue, 'minesNumber')}
                    max={props.value.rowSize * props.value.colSize}
                />
        </div>
    )

}
export default  SettingArea;