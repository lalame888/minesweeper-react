// 踩地雷上面的那個笑臉跟死掉的臉，開對就笑一下

import { GameStatus, SquareData, SquareStatus } from "@/interface";
import { IconDefinition, faFaceDizzy, faFaceLaughSquint, faFaceMeh, faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

interface GameTitleProps {
    board: SquareData[][];
    gameState: GameStatus;
}
enum Status {
    '笑臉',
    '平常',
    '死亡',
    '勝利'
}
export function GameTitle(props: GameTitleProps){
    const [showStatus, setShowStatus] = useState<Status>(Status['平常']);
    const openCount = useRef<number>(0);
    const timeRef = useRef<NodeJS.Timeout>();
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
                const count = props.board.flat().filter((term)=> term.status === SquareStatus['開啟']).length;
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
    },[props.board, props.gameState])

    useEffect(()=>{
        // 笑臉維持0.5秒？就要變回去
        if (showStatus === Status['笑臉']) {
            if (timeRef.current) clearTimeout(timeRef.current);
            timeRef.current = setTimeout(()=>{
                setShowStatus(Status['平常'])
            }, 1000)
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
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        background: 'lightblue'
    }

    return (
        <div style={style}>
            <FontAwesomeIcon
                icon={icon}
            />
        </div>
    )
}

export default GameTitle;