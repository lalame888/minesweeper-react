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

export type GameConstructor = {
    rowSize: number,
    colSize: number,
    minesNumber: number,
    initIndex: BoardIndex
}

export class Game {
    private _board: SquareData[][];
    
    constructor(   
        public readonly setting: GameConstructor
    ){
        this._board = this.generateRandomMinesBoard();
    }
    public get board(): SquareData[][] {
        return this._board;
    }
    private generateRandomMinesBoard(): SquareData[][]{
        const minesSet = new Set<string>();

        while (minesSet.size < this.setting.minesNumber) {
            const row = Math.floor(Math.random() * this.setting.rowSize);
            const col = Math.floor(Math.random() * this.setting.colSize);
            if (row === this.setting.initIndex.col && col === this.setting.initIndex.row) {
                // 避開一開始點擊的位置，重新指定
                continue;
            }
            minesSet.add(`${row},${col}`); // 將座標轉換成字符串形式，以便Set處理
        }
        const board = Game.getEmptyBoard(this.setting.rowSize, this.setting.colSize)
        // 指定物件為炸彈
        Array.from(minesSet).forEach((position)=>{
            const [row, col] = position.split(',').map((n)=> parseInt(n));
            board[row][col].isMines = true;
        })

        // 計算數字
        const newBoard = board.map((row, rowIndex)=> row.map((term: SquareData, colIndex)=>{
            if (term.isMines) return term; // 本身就是炸彈不用計算數字
            let value =  this.calcNumber(board, {row: rowIndex, col: colIndex})
            return {...term, value}
        }));

        return newBoard;
    }
    private calcNumber(board: SquareData[][], index: BoardIndex): number {
        let value = 0;
            for(let i=-1; i<2; i++) { // 周圍九宮格開始計算
                const checkRow = index.row + i;
                for (let j=-1; j<2; j++) {
                    const checkCol = index.col + j;
                    if (board[checkRow] && board[checkRow][checkCol]?.isMines) value ++;
                }
            }
        return value;
    }
    static getEmptyBoard(rowSize: number, colSize: number): SquareData[][] {
        return Array.from(Array(rowSize)).map(()=> Array.from(Array(colSize)).map(()=> ({status: SquareStatus['未開啟'], isMines: false, value: -1})))
    }
    public clone(): Game {
        const newObject = Object.assign(Object.create(Object.getPrototypeOf(this)), this) as Game;
        newObject._board = JSON.parse(JSON.stringify(newObject._board));
        return newObject;
    }
    public openAll() {
        this._board = this._board.map((row)=> row.map((term) => {
            return {...term, status: SquareStatus['開啟']}
        }))
    }
    public openSquare(boardIndex: BoardIndex) { 
        const { row, col } = boardIndex;
        const term = this._board[row][col];
        // 如果是標記旗子的、已經開啟的不用動
        if ([SquareStatus['標記旗子'], SquareStatus['開啟']].includes(term.status)) return;
        if (term.isMines && term.status === SquareStatus['未開啟']) {
            term.status = SquareStatus['死亡'];
            // 將其他所有的都開啟
            this._board.forEach((row)=> row.forEach((t)=> t.status = SquareStatus['開啟']))
        }
        term.status = SquareStatus['開啟'];
        if (term.value === 0) {
            for(let i=-1; i<2; i++) { // 處理周圍九宮格
                const checkRow = row + i;
                for (let j=-1; j<2; j++) {
                    const checkCol = col + j;
                    if (this._board[checkRow] && this._board[checkRow][checkCol]){
                        const check = this._board[checkRow][checkCol];
                        if (check.status === SquareStatus['未開啟'] && check.isMines === false) {
                            if (check.value === 0) {
                                 // 如果空白格，遞迴的進行處理
                                 this.openSquare({row: checkRow, col: checkCol});
                            } else {
                                // 普通的數字
                                check.status = SquareStatus['開啟'];
                            }
                        }
                    }
                }
            } 
        }
    }
    public setMark(boardIndex: BoardIndex) { 
        const {row, col} = boardIndex;
        const term = this._board[row][col];
        if (term.status === SquareStatus['未開啟']) term.status = SquareStatus['標記旗子'];
    }
    public get gameState(): GameStatus {
        const flatArr = this._board.flat();
        // 如果有死亡的，判輸
        if (flatArr.find((term)=> term.status === SquareStatus['死亡'])) return GameStatus['失敗'];
        // 如果未開啟+插旗的數量 === 地雷數，獲勝
        if (flatArr.filter((t)=> t.status === SquareStatus['未開啟'] || t.status === SquareStatus['標記旗子']).length === this.setting.minesNumber) {
            return GameStatus['勝利']
        }
        return GameStatus['進行中'];
    }

}

export enum GameStatus {
    '初始化',
    '進行中',
    '暫停',
    '失敗',
    '勝利'
}
