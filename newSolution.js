  //樣式修改變數
const QUEENSYMBOL = 'Q' //主要符號
const SPACESYMBOL = '.' //次要符號
const noVacanciesSymbol = 'X'
const maxPuzzleSize = 10

//methods

//工具方法
function verify(puzzleNumber){
    if(puzzleNumber > maxPuzzleSize) {
        console.log(`請勿輸入超過${maxPuzzleSize}`)
        return false
    }
    if( typeof(puzzleNumber)!=='number' ) {
        console.log('請輸入數字')
        return false
    }
    if( !Number.isInteger(puzzleNumber) || puzzleNumber <= 0 ) {
        console.log('請輸入正整數')
        return false
    }
    if( (puzzleNumber % 2) !==0  ) {
        console.log('請輸入偶數')
        return 
    }   
    return true
}

/**
 * 棋盤產生器
 * 畫出一行的棋盤
 * @param {*} puzzleNumber 必填，代表 n-puzzle 的 n
 * @param {*} placementIndex 必填，指示Queen要放在哪個位置
 * @param {*} queenSymbol 必填，Queen 的符號樣式
 * @param {*} spaceSymbol 必填，空格 的符號樣式
 * @returns string ， 返回一行棋盤字串
 */
function drawPuzzle(puzzleNumber, placementIndex, queenSymbol, spaceSymbol){
    //把queen放在第index個，然後剩下的用second填滿
    let result = ''
    for ( let i = 0 ; i < puzzleNumber ; i++){
        if( i === placementIndex ) result += queenSymbol
        else result += spaceSymbol
    }

    return result
}

//演算法
/**
 * 檢查該格位置可否放置皇后 :
 * 只要檢查 其上一Row以上的Rows中 有無任一在其 米字範圍內 的皇后即可
 * @param {Array} currentposition ，[rowIndex, colIndex]
 * @param {Array} solutionArr , 每一行皇后位置的清單 ( 長度為n，每個index代表row，值表示皇后所在的col )
 * @returns {boolean} 回傳true表示該格可以放皇后
 */
function isSafe(currentposition, solutionArr) {
    const [testRow, testCol] = currentposition  //例如現在位置是 2,2
    
    for(let row = 0 ; row < testRow ; row++){
        //檢查直線上有無其他皇后
        if( testCol === solutionArr[row]) {
            return false
        }
        //檢查/和\線上有無其他皇后
        if( Math.abs(testCol - solutionArr[row]) === Math.abs(testRow - row)){
            return false
        }
    }
    return true
}
function findQueenLoop(puzzleNumber,currentRow,solutionArr,puzzleSolutions){
    console.log('開啟',currentRow,'的搜尋')
    //開始每一col的查找
    for(let col = 0 ; col < puzzleNumber ; col++ ){
        console.log('搜尋',col)
        if(!isSafe([ currentRow, col ], solutionArr)) continue
        else{ //找到安全位置
            solutionArr[currentRow] = col //標示皇后位置
            if( currentRow !== puzzleNumber - 1 ) {  //不是最後一行的話
                console.log('找到往下',)
                findQueenLoop(puzzleNumber,++currentRow,solutionArr) //繼續往下找
            }
            else puzzleSolutions.push(solutionArr) //走完全部，把解推入解方陣列中
        }
    }
    console.log(currentRow,'迴圈結束')
}
function getAllpuzzleSolution( puzzleNumber ){
    if(!verify(puzzleNumber)) return 
    const puzzleSolutions = []  //裝解答
    const currentSolution = [] // --> 專門儲存皇后所在位置的列表清單，例如[1,3,2,5,6,7,4,0]，index代表row，值代表col
    findQueenLoop(puzzleNumber,0,currentSolution,puzzleSolutions)
    //2.最後照puzzleSolutions印出所有解答
    console.log(puzzleSolutions)
}
getAllpuzzleSolution( 4 )