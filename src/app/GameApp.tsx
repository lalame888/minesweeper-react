import { CSSProperties, useCallback } from "react";
import { BoardIndex, ClickDirect, GameStatus } from "@/interface";
import { MinesGame, SettingArea } from "@/component";
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { AppDispatch, gameAction, useReduxSelector } from "@/redux";
import { useTimer } from "@/feature";

  // TODO: 行有餘力：做一個Storybook & jest單元測試

export default function GameApp() {
  
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
          <MinesGame/>
        </Col>
        <Col sm={12} md={4} style={settingAreaStyle}>
          <SettingArea/>
        </Col>
      </Row>
    </Container>
  );
}
