'use client';
import { Provider } from "react-redux";
import { store } from "@/redux";
import { useEffect, useState } from "react";
import { Game, GameConstructor } from "@/interface";
import { Board, SettingArea } from "@/component";
import { Col, Container, Row } from 'react-bootstrap';

export default function Home() {
  const [settingValue, setSettingValue] = useState<GameConstructor>(
    {
      rowSize: 10, colSize: 5, 
      minesNumber: 15, initIndex:{row: 0, col:0}
    });
  const [game, setGame] = useState<Game | undefined>(undefined)
  useEffect(()=>{
    setGame(new Game(settingValue));
  },[settingValue])
  return (
    <Provider store={store}>
        <Container style={{marginTop: 20, marginBottom: 20}}>
          <Row >
            <Col sm={12} md={8} 
              style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
              }}
            >
            {game && 
            <Board
              data={game.board}
              onClick={()=> {}}
            />
          }
            </Col>
            <Col sm={12} md={4}>

              <SettingArea
                value={settingValue}
                setValue={setSettingValue}
              />
            </Col>
          </Row>
          
        </Container>
    </Provider>
  );
}
