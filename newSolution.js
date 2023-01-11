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
 * 用來檢查該格未置可否放置皇后
 * @param {Array} colposition ，[rowIndex, colIndex]
 * @param {Array} puzzle , 棋盤二維陣列
 * @returns {boolean} 回傳true表示該格可以放皇后
 */
function colhasQueenPosition(colposition,puzzle) {
    const [row, col] = colposition
    if( row === 0 ) return
    //2. check函式 (傳入Queen的位置,檢查是否有和其他皇后相撞)
        //只要檢查 其上一Row開始的Rows 有無任一在他米字範圍內的皇后即可
        //回傳true或false
        
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
    let puzzle = initPuzzle(puzzleNumber)
    puzzle[0][0] = QUEENSYMBOL
    console.log(colhasQueenPosition([2,1],puzzle))
     //1.外圈從第一row開始跑；然後使用check函式看該row有沒有能放皇后的位置
        //1-1 true的話，把皇后放進去，然後往下一row跑；能跑完最後一row，就推此解到puzzleSolutions中
        //1-2 false的話表示無解，直接中斷；並退回上一row，
          //1-2-1 在上一row中繼續上面1-1步驟
        
    //2.最後照puzzleSolutions印出所有解答
}
getAllpuzzleSolution( 4 )
//test
// getAllpuzzleSolution('aa')  //"請輸入數字"
// getAllpuzzleSolution(-1)     //"請輸入正整數"
// getAllpuzzleSolution(0)    //"請輸入正整數"
// getAllpuzzleSolution(5.5)     //"請輸入正整數"
// getAllpuzzleSolution(-5.5)     //"請輸入正整數"
// getAllpuzzleSolution(9)     //'請輸入偶數'