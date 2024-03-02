import { GameConstructor, GameStatus } from "@/interface";
import { CSSProperties } from "react";
import SettingRow from "./SettingRow";
import Title from "./Title";
import { useReduxSelector, AppDispatch, gameAction } from "@/redux";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { getKeyByValue } from "@/utils";

// TODO: 顯示狀態？
export function SettingArea(){
    const gameData = useReduxSelector((state)=> state.game.gameData);
    const gameStatus = useReduxSelector((state)=> state.game.gameStatus);
    const dispatch: AppDispatch = useDispatch();

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
    const statusStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        border: '1px solid white',
        borderRadius: 3,
        padding: 10,
        marginBottom: 10,
        color: '#4b4b4b',
    }
    const buttonStyle: CSSProperties = {
        marginTop: 15,
    }
    function onSettingChange(newValue: number, term: Exclude<keyof GameConstructor, 'initIndex'> ) {
        if (!isNaN(newValue) && newValue>0) {
            const newSetting = {...gameData.setting}
            newSetting[term] = newValue;
            newSetting.minesNumber = Math.min(newSetting.minesNumber, newSetting.rowSize * newSetting.colSize - 1)
            dispatch(gameAction.settingEmpty(newSetting));
        }
    }
    const disabled = gameStatus !== GameStatus['初始化'];
    
    return (
        <div style={style}>
            <Title/>
            <div style={settingStyle}>
                <div style={statusStyle}>
                    <span>狀態：{getKeyByValue(GameStatus, gameStatus)}</span>
                </div>
                <SettingRow
                    disabled={disabled}
                    value={gameData.setting.rowSize}
                    name={'直排數'}
                    setValue={(newValue)=> onSettingChange(newValue, 'rowSize')}
                    max={50}
                />
                <SettingRow
                    disabled={disabled}
                    value={gameData.setting.colSize}
                    name={'橫排數'}
                    setValue={(newValue)=> onSettingChange(newValue, 'colSize')}
                    max={50}
                />
                <SettingRow
                    disabled={disabled}
                    value={gameData.setting.minesNumber}
                    name={'地雷數'}
                    setValue={(newValue)=> onSettingChange(newValue, 'minesNumber')}
                    max={gameData.setting.rowSize * gameData.setting.colSize}
                />
                {
                    gameStatus !== GameStatus['初始化'] &&
                    <Button 
                        style={buttonStyle}
                        onClick={()=> dispatch(gameAction.resetGame())}
                    >重新挑戰</Button>
                }
                
            </div>
                
        </div>
    )

}
export default  SettingArea;