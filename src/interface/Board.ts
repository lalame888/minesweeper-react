export enum SquareStatus {
    '未開啟' = 'unOpen',
    '安全開啟' = 'safeOpen',
    '標記旗子' = 'mark',
    '死亡' = 'dead',
    '錯標旗子' = 'errorMark', // 最後公開解答的時候 非炸彈但是判定成炸彈
    '未標炸彈' = 'unMark', // 最後公開解答的時候 是炸彈但是沒有標出來
}

export type SquareData = {
    status: SquareStatus,
    isMines: boolean,
    value: number // 0~8 顯示周圍地雷數量
}

export type BoardIndex = {
    row: number,
    col: number
}
export enum ClickDirect {
    '左鍵' = 0,
    '右鍵' = 2,
}

export type GameConstructor = {
    rowSize: number,
    colSize: number,
    minesNumber: number,
    initIndex: BoardIndex
}

export enum GameStatus {
    '初始化' = 'init',
    '進行中' = 'running',
    '暫停' = 'pause',
    '失敗' = 'fail',
    '勝利' = 'win'
}

export type Game = {
    board: SquareData[][];
    setting: GameConstructor;
}