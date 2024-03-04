import { useTimer } from "@/feature";
import { Game, GameStatus, SquareStatus } from "@/interface";
import { IconDefinition, faFaceDizzy, faFaceLaughSquint, faFaceMeh, faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

interface GameTitleProps {
    game: Game;
    gameState: GameStatus;
}
enum Status {
    '笑臉',
    '平常',
    '死亡',
    '勝利'
}
export function GameTitle(props: GameTitleProps){
    const {time} = useTimer(props.gameState);

    const [showStatus, setShowStatus] = useState<Status>(Status['平常']);
    const openCount = useRef<number>(0);
    const timeRef = useRef<NodeJS.Timeout>();
    const countMines = useMemo(()=>{
        return props.game.setting.minesNumber - props.game.board.flat().filter((t)=> t.status === SquareStatus['標記旗子']).length
    },[props.game])
    useEffect(()=>{
        switch (props.gameState) {
            case GameStatus['失敗']:
                setShowStatus(Status['死亡']);
                break;
            case GameStatus['勝利']:
                setShowStatus(Status['勝利']);
                break;
            case GameStatus['進行中']: {
                // 計算
                const count = props.game.board.flat().filter((term)=> term.status === SquareStatus['安全開啟']).length;
                if (count > openCount.current ) { // 開的數量變多了
                    setShowStatus(Status['笑臉']);
                    openCount.current =  count;
                }
                break;
            }
            case GameStatus['初始化']:
                openCount.current = 0;
                setShowStatus(Status['平常']);
                break;
        }
    },[props.game.board, props.gameState])

    useEffect(()=>{
        // 笑臉維持0.3秒就要變回去
        if (showStatus === Status['笑臉']) {
            if (timeRef.current) clearTimeout(timeRef.current);
            timeRef.current = setTimeout(()=>{
                setShowStatus(Status['平常'])
            }, 300)
        } else if (showStatus === Status['死亡'] || showStatus === Status['勝利']) {
            // 取消會變回平常臉的setTimeout
            if (timeRef.current) clearTimeout(timeRef.current);
        }
    }, [showStatus])
    const icon: IconDefinition = useMemo(()=>{
        switch(showStatus) {
            case Status['死亡']:
                return faFaceDizzy;
            case Status['勝利']:
                return faFaceLaughSquint;
            case Status['笑臉']:
                return faFaceSmileBeam;
            case Status['平常']:
                return faFaceMeh;
        }
    }, [showStatus])

    const style: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        fontSize: '24px',
        color: 'black'
    }
    const hrStyle: CSSProperties = {
        marginTop:5, 
        marginBottom:10, 
        borderColor: 'darkblue'
    }

    return (
        <div style={{maxWidth: '100%'}}>
            <div style={style}>
                <NumberView name={'剩餘標記'} value={countMines}/>
                <FontAwesomeIcon icon={icon} style={{color: 'white'}}/>
                <NumberView name={'計時'} value={time}/>
            </div>
        <hr style={hrStyle}/>
        </div>
    )
}

function NumberView(props: {value: number, name: string}) {
    const style: CSSProperties = {
        backgroundColor: 'white',
        border: '1px solid, white',
        borderRadius: '3px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px',
        marginLeft: '10px',
        flexDirection: 'column',
    }
    const textStyle: CSSProperties = {
        fontSize: 15,
        wordBreak: 'keep-all'
    }
    return (
        <div style={style}>
            <span style={textStyle}>{props.name}</span>
            <span>{props.value}</span>
        </div>
    )
}

export default GameTitle;