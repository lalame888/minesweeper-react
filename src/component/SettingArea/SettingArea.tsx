import { GameConstructor } from "@/interface";
import { CSSProperties } from "react";
import SettingRow from "./SettingRow";
import Title from "./Title";

interface SettingAreaProps {
    value: GameConstructor
    setValue(newVale: GameConstructor): void
}

export function SettingArea(props: SettingAreaProps){
    const style: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
    const settingStyle: CSSProperties = {
        backgroundColor: 'lightblue',
        padding: 20,
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
            <Title/>
            <div style={settingStyle}>
                <SettingRow
                    value={props.value.rowSize}
                    name={'直排數'}
                    setValue={(newValue)=> onSettingChange(newValue, 'rowSize')}
                    max={300}
                />
                <SettingRow
                    value={props.value.colSize}
                    name={'橫排數'}
                    setValue={(newValue)=> onSettingChange(newValue, 'colSize')}
                    max={300}
                />
                <SettingRow
                    value={props.value.minesNumber}
                    name={'地雷數'}
                    setValue={(newValue)=> onSettingChange(newValue, 'minesNumber')}
                    max={props.value.rowSize * props.value.colSize}
                />
            </div>
                
        </div>
    )

}
export default  SettingArea;