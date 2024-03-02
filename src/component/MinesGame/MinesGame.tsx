import { BoardIndex, ClickDirect, Game, GameStatus } from "@/interface";
import { CSSProperties } from "react";
import GameTitle from "./GameTitle";
import Board from "./Board";

interface MinesGameProps {
    onClick(index: BoardIndex, direct: ClickDirect): void;
    gameData: Game;
    gameStatus: GameStatus
    time: number
}

export function MinesGame(props: MinesGameProps){
    const style: CSSProperties = {
        border: '10px solid #1d71c8',
        borderRadius: 10,
        backgroundColor: '#1d71c8',
        maxWidth: 'inherit',
    }
    return (
        <div style={style}>
            <GameTitle
                game={props.gameData}
                gameState={props.gameStatus}
                time={props.time}
            />
            <Board
                board={props.gameData.board}
                onClick={props.onClick}
            />
        </div>
    )
}
export default  MinesGame;