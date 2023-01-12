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
 * 初始化棋盤
 * @param {number} puzzleNumber 
 * @returns {Array} 返回一個 queenPuzzle 陣列
 */
function initPuzzle(puzzleNumber){
    const queenPuzzle = Array.from(Array(puzzleNumber),()=> new Array(puzzleNumber)) 
    queenPuzzle.forEach( row => {
        for(let i = 0 ; i <row.length ;i++ ){
            row[i] = null
        }
    })
    return queenPuzzle
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
 * @param {Array} colposition ，[rowIndex, colIndex]
 * @param {Array} puzzle , 棋盤二維陣列
 * @returns {boolean} 回傳true表示該格可以放皇后
 */
function colhasQueenPosition(colposition,puzzle) {
    const [row, col] = colposition
    
    for(let i = 0 ; i < row ; i++){
        //檢查直線上有無其他皇后
        if( puzzle[ i ][ col ] === QUEENSYMBOL) {
            return false
        }
        //檢查/線上有無其他皇后
        if( puzzle[ i ][ (row-i) + col ] ){
            return false
        }
        //檢查\線上有無其他皇后
        if( puzzle[ i ][ (i-row) + col ] ){
            return false
        }
    }
    return true
}
function getAllpuzzleSolution( puzzleNumber ){
    const puzzleSolutions = []  //裝解答
    if(!verify(puzzleNumber)) return 
    // let puzzle = initPuzzle(puzzleNumber)
    const currentSolution = [] // --> 專門儲存皇后所在位置的列表清單，例如[1,3,2,5,6,7,4,0]，index代表row，值代表col
    
    //一行一行放皇后 
    //每一行都會檢查每一格是否可以放皇后 (目標 將皇后擺放在第一個安全位置上 ) 
       //若該格可以放，將該col位置紀錄起來，currentSolution[row] = col ==> 然後繼續找下一格!!!
       //若該格不能放，則繼續跑下一格
       //若能跑到currentSolution[最後一個]，就是有解答，直接推送到解答組裡面
        
    //2.最後照puzzleSolutions印出所有解答
    console.log(puzzleSolutions)
}
getAllpuzzleSolution( 4 )