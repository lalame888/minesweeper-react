import { CSSProperties, useMemo, useState } from "react";
import { BoardIndex, ClickDirect, GameConstructor, SquareData } from "@/interface";
import { Board, GameTitle, SettingArea } from "@/component";
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { AppDispatch, gameAction, useReduxSelector } from "@/redux";
import { MinesFunction } from "@/feature";
import { dir } from "console";

  // TODO: 行有餘力：做一個Storybook & jest單元測試

export default function GameApp() {
  console.log('render game')
  const gameData = useReduxSelector((state)=> state.game.gameData);
  const gameStatus = useReduxSelector((state)=> state.game.gameStatus);

  const dispatch: AppDispatch = useDispatch();
  const [settingValue, setSettingValue] = useState<GameConstructor>(
    {
      rowSize: 10, colSize: 10, 
      minesNumber: 15, initIndex:{row: 0, col:0}
    });
  const emptyData: SquareData[][] = useMemo(() => {
    return MinesFunction.createEmptyBoard(settingValue.rowSize, settingValue.colSize);
  }, [settingValue.rowSize, settingValue.colSize]);

  function clickSquare(index: BoardIndex, direct: ClickDirect) {
      if (!gameData) dispatch(gameAction.startGame({...settingValue, initIndex: index})); // 新遊戲
      else {
        if (direct === ClickDirect['左鍵']) {
          dispatch(gameAction.openSquare(index)); // 點擊方塊
        } else {
          dispatch(gameAction.setMark(index))
        }
      }
  }
  const style: CSSProperties = {
    marginTop: 20, marginBottom: 20
  }
  const gameBoardStyle: CSSProperties = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  }
  const settingAreaStyle: CSSProperties = {
    height: 'calc(100vh - 40px)'
  }
  return (
    <Container style={style}>
      <Row >
        <Col sm={12} md={8} style={gameBoardStyle}>
          <Board
            data={gameData?.board || emptyData}
            onClick={clickSquare}
          />
        </Col>
        <Col sm={12} md={4} style={settingAreaStyle}>
          <SettingArea
            value={settingValue}
            setValue={setSettingValue}
          />
        </Col>
      </Row>
    </Container>
  );
}
