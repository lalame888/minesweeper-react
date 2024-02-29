import { BoardIndex, Game, GameConstructor, GameStatus, SquareData, SquareStatus } from "@/interface";

function calcNumber(board: SquareData[][], index: BoardIndex): number {
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
export function createEmptyBoard(rowSize: number, colSize: number): SquareData[][] {
    return Array.from(Array(rowSize)).map(()=> Array.from(Array(colSize)).map(()=> ({status: SquareStatus['未開啟'], isMines: false, value: -1})))
}
export function generateRandomMinesBoard(setting: GameConstructor) {
    const minesSet = new Set<string>();

    while (minesSet.size < setting.minesNumber) {
        const row = Math.floor(Math.random() * setting.rowSize);
        const col = Math.floor(Math.random() * setting.colSize);
        if (row === setting.initIndex.col && col === setting.initIndex.row) {
            // 避開一開始點擊的位置，重新指定
            continue;
        }
        minesSet.add(`${row},${col}`); // 將座標轉換成字符串形式，以便Set處理
    }
    const board = createEmptyBoard(setting.rowSize, setting.colSize)
    // 指定物件為炸彈
    Array.from(minesSet).forEach((position)=>{
        const [row, col] = position.split(',').map((n)=> parseInt(n));
        board[row][col].isMines = true;
    })

    // 計算數字
    const newBoard = board.map((row, rowIndex)=> row.map((term: SquareData, colIndex)=>{
        if (term.isMines) return term; // 本身就是炸彈不用計算數字
        let value =  calcNumber(board, {row: rowIndex, col: colIndex})
        return {...term, value}
    }));

    return newBoard;
}

// 直接改動狀態
export function openAll(board: SquareData[][]): void {
    board.forEach((row)=> row.forEach((term) => {
        if (term.status !== SquareStatus['死亡']) term.status = SquareStatus['開啟'];
    }))
}
// 直接改動狀態
export function openSquare(board: SquareData[][], boardIndex: BoardIndex): void{ 
    const { row, col } = boardIndex;
    const term = board[row][col];

    // 如果是標記旗子的、已經開啟的不用動
    if (term.status !== SquareStatus['未開啟']) return;
    if (term.isMines && term.status === SquareStatus['未開啟']) {
        term.status = SquareStatus['死亡'];
        // 將其他所有的都開啟
        openAll(board);
        return;
    } 
    term.status = SquareStatus['開啟'];
    
    if (term.value === 0) {
        for(let i=-1; i<2; i++) { // 處理周圍九宮格
            const checkRow = row + i;
            for (let j=-1; j<2; j++) {
                const checkCol = col + j;
                if (board[checkRow] && board[checkRow][checkCol]){
                    const check = board[checkRow][checkCol];
                    if (check.status === SquareStatus['未開啟'] && check.isMines === false) {
                        if (check.value === 0) {
                             // 如果空白格，遞迴的進行處理
                            openSquare(board, {row: checkRow, col: checkCol});
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
// 直接改動狀態
export function setMark(board: SquareData[][],boardIndex: BoardIndex) { 
    const {row, col} = boardIndex;
    const term = board[row][col];
    if (term.status !== SquareStatus['未開啟']) return;
    term.status = SquareStatus['標記旗子'];
}
export function getGameState(game: Game): GameStatus {
    const flatArr = game.board.flat();
    // 如果有死亡的，判輸
    if (flatArr.find((term)=> term.status === SquareStatus['死亡'])) return GameStatus['失敗'];
    // 如果未開啟+插旗的數量 === 地雷數，獲勝
    if (flatArr.filter((t)=> t.status === SquareStatus['未開啟'] || t.status === SquareStatus['標記旗子']).length === game.setting.minesNumber) {
        return GameStatus['勝利']
    }
    return GameStatus['進行中'];
}