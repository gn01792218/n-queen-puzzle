//樣式修改變數
const QUEENSYMBOL = 'Q' //主要符號
const SPACESYMBOL = '.' //次要符號

//全局參數
const maxPuzzleSize = 16
const puzzleSolutions = []  //裝所有解答用
const currentSolution = [] // --> 專門儲存皇后所在位置的列表清單，例如[1,3,2,5,6,7,4,0]，index代表row，值代表col
const puzzleNumber = 5

//結果輸出
getAllpuzzleSolution( puzzleNumber )

//methods
//1.工具方法
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
    return true
}

/**
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

/**
 * 畫出一盤棋盤解
 * @param {number} puzzleNumber 必填，代表 n-puzzle 的 n
 * @param {Array} solutionArray 必填，每一行皇后位置的清單 ( 長度為n，每個index代表row，值表示皇后所在的col )
 * @returns {string} 返回棋盤解的字串
 */
function printSolution(puzzleNumber,solutionArray){
    let puzzleSolutionStr = `//-----第${puzzleSolutions.length}組解----//\n`
    solutionArray.forEach( ( colIndex, index) => {
        if( index === puzzleNumber -1 ) puzzleSolutionStr += drawPuzzle(puzzleNumber,colIndex, QUEENSYMBOL, SPACESYMBOL) +'\n'
        else puzzleSolutionStr += drawPuzzle(puzzleNumber,colIndex, QUEENSYMBOL, SPACESYMBOL)+'\n'
    })
    return puzzleSolutionStr
}
// /**
//  * 劃出所有棋盤解的方法
//  * @param {number} puzzleNumber 
//  * @param {所有解的清單} allSolutionArray 
//  * @returns 
//  */
// function drawAllPuzzle(puzzleNumber,allSolutionArray){
//     let result = ''
//     //照puzzleSolutions印出所有解答
//     allSolutionArray.forEach((solution)=>{
//         let puzzleSolutionStr = printSolution(puzzleNumber,solution)
//         result += puzzleSolutionStr
//     })
//     console.log(result + `\n一共${allSolutionArray.length}組解`)
//     return result + `\n一共${allSolutionArray.length}組解`
// }
//2.演算法
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

/**
 * 每一Row迴圈查找皇后位置的遞迴函式
 * @param {number} puzzleNumber 必填，代表 n-puzzle 的 n
 * @param {number} currentRow 必填，哪一row
 * @param {Array} solutionArr  必填，每一行皇后位置的清單 ( 長度為n，每個index代表row，值表示皇后所在的col )
 * @param {Array} allSolutionArray 必填，儲存所有解的地方
 */
function findQueenLoop(puzzleNumber,currentRow,solutionArr,allSolutionArray){
    //開始每一col的查找
    for(let col = 0 ; col < puzzleNumber ; col++ ){
        if(isSafe([ currentRow, col ], solutionArr)) {
            solutionArr[currentRow] = col //標示皇后位置
            // console.log('現在位置',currentRow,col)
            if( currentRow === puzzleNumber-1 ){
                allSolutionArray.push( solutionArr ) //走完全部，把解推入解方陣列中
                console.log(printSolution(puzzleNumber, solutionArr))
            } 
            else findQueenLoop(puzzleNumber,currentRow+1,solutionArr,allSolutionArray) //繼續往下找，col停在這等待
        }else {
            continue
        }
    }
}

/**
 * 執行函式
 * @param {number} puzzleNumber 
 * @returns 
 */
function getAllpuzzleSolution( puzzleNumber ){
    if(!verify(puzzleNumber)) return 
    findQueenLoop(puzzleNumber,0,currentSolution,puzzleSolutions)
}