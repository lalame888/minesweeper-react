import { MinesFunction } from '@/feature';
import { BoardIndex, Game, GameConstructor, GameStatus } from '@/interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type StateType = {
  gameData: Game,
  gameStatus: GameStatus,
}

const initSetting = {
  rowSize: 1, colSize: 4, 
  minesNumber: 1, initIndex:{row: 0, col:0}
}

// 初始狀態
const initialState: StateType = {
  gameData: {
    setting: initSetting,
    board: MinesFunction.createEmptyBoard(initSetting.rowSize, initSetting.colSize)
  },
  gameStatus: GameStatus['初始化'],
};

// 創建一個Slice
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<BoardIndex>) => {
      const initIndex= action.payload;
      const {minesNumber,rowSize, colSize } = state.gameData.setting;
      if (minesNumber < rowSize * colSize && 
          minesNumber > 0 && 
          rowSize * colSize>0
        ) {
          const setting = {...state.gameData.setting, initIndex};
          state.gameData = { 
            board: MinesFunction.generateRandomMinesBoard(setting),
            setting
          };
          MinesFunction.openSquare(state.gameData.board, initIndex); //點開 
          state.gameStatus = MinesFunction.getGameState(state.gameData);
      }
    },
    giveUp: (state) => { // 放棄遊戲
      if (state.gameData) {
        MinesFunction.openMines(state.gameData.board); // 開啟
        state.gameStatus = GameStatus['失敗'];
      }
    },
    resetGame: (state) => { // 遊戲重新開始
      const {rowSize, colSize} = state.gameData.setting;
      state.gameData = {
        ...state.gameData,
        board: MinesFunction.createEmptyBoard(rowSize, colSize)
      };
      state.gameStatus = GameStatus['初始化'];
    },
    pauseTime: (state) => { // 暫停遊戲
      state.gameStatus = GameStatus['暫停'];
    },
    continueTime: (state) => { // 遊戲繼續
      state.gameStatus = GameStatus['進行中'];
    },
    openSquare: (state, action: PayloadAction<BoardIndex>) => { //點擊方塊
      if (state.gameData) {
        MinesFunction.openSquare(state.gameData.board, action.payload);
        // 點完之後更新一下遊戲狀態（獲勝、死亡、繼續）
        state.gameStatus = MinesFunction.getGameState(state.gameData);
      }
    },
    setMark: (state, action: PayloadAction<BoardIndex>) => { // 插旗
      if (state.gameData) {
        MinesFunction.setMark(state.gameData.board, action.payload)
      }
    },
    settingEmpty: (state, action: PayloadAction<GameConstructor>) => {
      const { rowSize, colSize } = action.payload;
      state.gameData = {
        setting: action.payload,
        board: MinesFunction.createEmptyBoard(rowSize, colSize)
      };
    },
  }
});

// 匯出actions和reducer
export const gameAction = gameSlice.actions;
export default gameSlice.reducer;