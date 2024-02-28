// gameSlice.ts
import { BoardIndex, Game, GameConstructor, GameStatus } from '@/interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type StateType = {
  gameData: Game | undefined,
  gameStatus: GameStatus,
  time: number,
}

// 初始狀態
const initialState: StateType = {
  gameData: undefined,
  gameStatus: GameStatus['初始化'],
  time: 0,
};

// 創建一個Slice
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<GameConstructor>) => {
      const {minesNumber, rowSize, colSize} = action.payload;
      if (minesNumber < rowSize * colSize && 
          minesNumber > 0 && 
          rowSize * colSize>0
        ) {
        state.gameData = new Game(action.payload);
        state.time = 0;
        state.gameStatus = GameStatus['進行中'];
      }
    },
    giveUp: (state) => { // 放棄遊戲
      if (state.gameData) {
        state.gameData.openAll(); // 全部開啟
        state.gameStatus = GameStatus['失敗'];
      }
    },
    initGame: (state) => { // 重新開始回到設定
      state = initialState;
    },
    incrementTime: (state) => { // 增加秒數
      state.time += 1;
    },
    pauseTime: (state) => { // 暫停遊戲
      state.gameStatus = GameStatus['暫停'];
    },
    continueTime: (state) => { // 遊戲繼續
      state.gameStatus = GameStatus['進行中'];
    },
    openSquare: (state, action: PayloadAction<BoardIndex>) => { //點擊方塊
      if (state.gameData) {
        state.gameData.openSquare(action.payload);
        // 點完之後更新一下遊戲狀態（獲勝、死亡、繼續）
        state.gameStatus = state.gameData.gameState;
      }
    },
    setMark: (state, action: PayloadAction<BoardIndex>) => { // 插旗
      state.gameData?.setMark(action.payload);
    }
  }
});

// 匯出actions和reducer
export const { startGame } = gameSlice.actions;
export default gameSlice.reducer;