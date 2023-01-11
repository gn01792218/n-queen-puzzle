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
 * @param {Object} position ，位置物件: { row:行, col:列 }
 * @param {Array} puzzle , 棋盤二維陣列
 * @returns {boolean} 回傳true表示該格可以放皇后
 */
function hasQueenPosition(position,puzzle) {
    const { row, col } = position
    //2. check函式 (傳入Queen的位置,檢查是否有和其他皇后相撞)
        //只要檢查 其上一Row開始的Rows 有無任一在他米字範圍內的皇后即可
        //回傳true或false
    return false
}
function getAllpuzzleSolution( puzzleNumber ){
    const puzzleSolutions = []  //裝解答
    if(!verify(puzzleNumber)) return 
     //1.外圈從第一row開始跑；然後使用check函式放皇后，
        //check回傳true的話，往下一row移動 ； false的話往右邊的col移動
        //如果在該row的最後一col check結果也是false，表示無解
    //2.最後照puzzleSolutions印出所有解答
}

//test
// getAllpuzzleSolution('aa')  //"請輸入數字"
// getAllpuzzleSolution(-1)     //"請輸入正整數"
// getAllpuzzleSolution(0)    //"請輸入正整數"
// getAllpuzzleSolution(5.5)     //"請輸入正整數"
// getAllpuzzleSolution(-5.5)     //"請輸入正整數"
// getAllpuzzleSolution(9)     //'請輸入偶數'