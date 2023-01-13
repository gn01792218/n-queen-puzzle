  //樣式修改變數
const QUEENSYMBOL = 'Q' //主要符號
const SPACESYMBOL = '.' //次要符號
const maxPuzzleSize = 16

//全局參數
const puzzleSolutions = []  //裝所有解答用
const currentSolution = [] // --> 專門儲存皇后所在位置的列表清單，例如[1,3,2,5,6,7,4,0]，index代表row，值代表col
const puzzleNumber = 8
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
 * 印出所有解的方法
 * @param {number} puzzleNumber 
 * @param {所有解的清單} allSolutionArray 
 * @returns 
 */
function drawAllPuzzle(puzzleNumber,allSolutionArray){
    console.log('解',allSolutionArray)
    // let result = ''
    // //照puzzleSolutions印出所有解答
    // allSolutionArray.forEach((solution,index)=>{
    //     let puzzleSolutionStr = `//-----第${index+1}組解----//\n`
    //     solution.forEach( ( colIndex, index) => {
    //         if( index === puzzleNumber -1 ) puzzleSolutionStr += drawPuzzle(puzzleNumber,colIndex, QUEENSYMBOL, SPACESYMBOL) +'\n'
    //         else puzzleSolutionStr += drawPuzzle(puzzleNumber,colIndex, QUEENSYMBOL, SPACESYMBOL)+'\n'
    //     })
    //     result += puzzleSolutionStr
    // })
    // console.log(result + `\n一共${allSolutionArray.length}組解`)
    // return result + `\n一共${allSolutionArray.length}組解`
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
function findQueenLoop(puzzleNumber,currentRow,solutionArr,allSolutionArray){
    //開始每一col的查找
    for(let col = 0 ; col < puzzleNumber ; col++ ){
        if(isSafe([ currentRow, col ], solutionArr)) {
            solutionArr[currentRow] = col //標示皇后位置
            if( currentRow === puzzleNumber-1 ) allSolutionArray.push(solutionArr) //走完全部，把解推入解方陣列中
            else findQueenLoop(puzzleNumber,currentRow+1,solutionArr,allSolutionArray) //繼續往下找，col停在這等待
        }else {
            continue
        }
    }
}
function getAllpuzzleSolution( puzzleNumber ){
    if(!verify(puzzleNumber)) return 
    findQueenLoop(puzzleNumber,0,currentSolution,puzzleSolutions)
}
getAllpuzzleSolution( puzzleNumber )
// console.log('最終的陣列',puzzleSolutions)
// drawAllPuzzle(puzzleNumber,puzzleSolutions)