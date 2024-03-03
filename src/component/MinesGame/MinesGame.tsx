import { BoardIndex, ClickDirect, Game, GameStatus } from "@/interface";
import { CSSProperties, useCallback } from "react";
import GameTitle from "./GameTitle";
import Board from "./Board";
import { AppDispatch, gameAction, useReduxSelector } from "@/redux";
import { useTimer } from "@/feature";
import { useDispatch } from "react-redux";


export function MinesGame(){
    const gameData = useReduxSelector((state)=> state.game.gameData);
    const gameStatus = useReduxSelector((state)=> state.game.gameStatus);
    const {time} = useTimer(gameStatus);
    const dispatch: AppDispatch = useDispatch();
    const clickSquare = useCallback((index: BoardIndex, direct: ClickDirect) => {
        if (gameStatus === GameStatus['初始化']) {
          dispatch(gameAction.startGame(index)); // 新遊戲
        } else if (gameStatus === GameStatus['進行中']) {
          if (direct === ClickDirect['左鍵']) {
            dispatch(gameAction.openSquare(index)); // 點擊方塊
          } else {
            dispatch(gameAction.setMark(index))
          }
        }
    }, [dispatch, gameStatus])

    const style: CSSProperties = {
        border: '10px solid #1d71c8',
        borderRadius: 10,
        backgroundColor: '#1d71c8',
        maxWidth: 'inherit',
    }
    return (
        <div style={style}>
            <GameTitle
                game={gameData}
                gameState={gameStatus}
                time={time}
            />
            <Board
                board={gameData.board}
                onClick={clickSquare}
            />
        </div>
    )
}
export default  MinesGame;