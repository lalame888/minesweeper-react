'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { store } from "@/redux";
import { useEffect, useState } from "react";
import { Game, GameConstructor } from "@/interface";
import { Board, SettingArea } from "@/component";
import { Col, Container, Row } from 'react-bootstrap';

export default function Home() {
  const [settingValue, setSettingValue] = useState<GameConstructor>(
    {
      rowSize: 14, colSize: 4, 
      minesNumber: 5, initIndex:{row: 0, col:0}
    });
  const [game, setGame] = useState<Game | undefined>(undefined)
  useEffect(()=>{
    setGame(new Game(settingValue));
  },[settingValue])
  return (
    <Provider store={store}>
      <Container style={{marginTop: 20, marginBottom: 20}}>
        <Row >
          <Col xs={12} sm={8}>

          {game && 
          <Board
            data={game.board}
            onClick={()=> {}}
          />
        }
          </Col>
          <Col xs={12} sm={4}>

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
