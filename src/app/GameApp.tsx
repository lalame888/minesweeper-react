import { CSSProperties, useCallback } from "react";
import { BoardIndex, ClickDirect, GameStatus } from "@/interface";
import { MinesGame, SettingArea } from "@/component";
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { AppDispatch, gameAction, useReduxSelector } from "@/redux";
import { useTimer } from "@/feature";

  // TODO: 行有餘力：做一個Storybook & jest單元測試

export default function GameApp() {
  const gameData = useReduxSelector((state)=> state.game.gameData);
  const gameStatus = useReduxSelector((state)=> state.game.gameStatus);

  const dispatch: AppDispatch = useDispatch();
  const {time} = useTimer(gameStatus);
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
    marginTop: 20, marginBottom: 20
  }
  const gameBoardStyle: CSSProperties = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  }
  const settingAreaStyle: CSSProperties = {
    height: 'calc(100vh - 40px)'
  }
  return (
    <Container style={style}>
      <Row>
        <Col sm={12} md={8} style={gameBoardStyle}>
          <MinesGame
            gameData={gameData}
            gameStatus={gameStatus}
            time={time}
            onClick={clickSquare}
          />
        </Col>
        <Col sm={12} md={4} style={settingAreaStyle}>
          <SettingArea/>
        </Col>
      </Row>
    </Container>
  );
}
