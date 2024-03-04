import GameTitle from '@/component/MinesGame/GameTitle';
import { MinesFunction } from '@/feature';
import { Game, GameStatus, SquareStatus } from '@/interface/Board';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
const setting = {
  rowSize: 100,
  colSize: 100,
  minesNumber: 10,
  initIndex: {
    row: 0,
    col: 0
  }
}
const game: Game = {
  board: MinesFunction.generateRandomMinesBoard(setting),
  setting: setting
}

const meta = {
  title: 'Board/GameTitle',
  component: GameTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, props) => {
      const [data, setData] = useState<Game>({...game}); // 使用 useState 定義 value 的初始狀態
      // 定義點擊按鈕後的處理函數
      const incrementValue = () => {
        setData((oldData)=>{
          // 開啟一格安全的
          const target = oldData.board.flat().find((t)=> t.isMines === false && t.status ===SquareStatus['未開啟']);
          if (target) {
            return {...oldData, board: oldData.board.map((row)=> row.map((t)=>{
              if (t === target) {
                return {...target, status: SquareStatus['安全開啟']}
              }
              else return t;
            }))}
          }
          return oldData;
        })
      };
      return(
        <div style={{ 
          border: '10px solid #1d71c8',
          borderRadius: 10,
          backgroundColor: '#1d71c8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Story args={{...props.args, game: data}}/>
          {props.args.gameState === GameStatus['進行中'] &&
            <Button 
            variant='light'
            onClick={incrementValue}
          >安全開格子</Button>
          }
          
        </div>
    )
  },
  ],
  
} satisfies Meta<typeof GameTitle>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: { gameState: GameStatus['初始化'], game: game },
};
export const Running: Story = {
  args: { gameState: GameStatus['進行中'], game: game },
};
export const GameOver: Story = {
  args: { gameState: GameStatus['失敗'], game: game },
};
export const Win: Story = {
  args: { gameState: GameStatus['勝利'], game: game },
};