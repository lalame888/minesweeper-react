export enum SquareStatus {
    '未開啟',
    '開啟',
    '標記旗子',
    '死亡'
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
    '初始化',
    '進行中',
    '暫停',
    '失敗',
    '勝利'
}

export type Game = {
    board: SquareData[][];
    setting: GameConstructor;
}