 
//樣式修改變數
const QUEENSYMBOL = 'Q' //主要符號
const SPACESYMBOL = '.' //次要符號
const noVacanciesSymbol = 'X'

//切換輸出結果: 
puzzleOutput(8, 52)  //solution2 for 8-queen puzzle
//methods

//工具方法
function getSplitNumber(number){
    if(number<10) number = '0'+ number
    return String(number).split("")
}

// /**
//  * 棋盤產生器
//  * 畫出一行的棋盤
//  * @param {number} puzzleNumber 必填，代表 n-puzzle 的 n
//  * @param {number} placementIndex 必填，指示Queen要放在哪個位置
//  * @param {string} queenSymbol 必填，Queen 的符號樣式
//  * @param {string} spaceSymbol 必填，空格 的符號樣式
//  * @returns string ， 返回某一行棋盤字串
//  */
// function drawPuzzle(puzzleNumber, placementIndex, queenSymbol, spaceSymbol){
//     //把queen放在第index個，然後剩下的用second填滿
//     let result = ''
//     for ( let i = 0 ; i < puzzleNumber ; i++){
//         if( i === placementIndex ) result += queenSymbol
//         else result += spaceSymbol
//     }

//     return result
// }
function setNoVacancies(queenPuzzle,firstQueenIndex){
    const [ rowIndex, colIndex ] = getSplitNumber(firstQueenIndex)
    
     //2.將其米字路徑範圍上的都設置為"不能擺放"
        //如:第一顆02
        //該row全部都不能放(橫)
        for( let i = 0 ; i< queenPuzzle[rowIndex].length ;i++){
            //Q的地方或是已經標示為沒空位的則不用再畫一次
            if( i === Number(colIndex) || (queenPuzzle[rowIndex][i] === noVacanciesSymbol)) continue
            queenPuzzle[rowIndex][i] = noVacanciesSymbol
        }
        //每一row的第2顆都不能放(直)
        for( let i = 0 ; i< queenPuzzle.length ;i++){
            //Q的地方或是已經標示為沒空位的則不用再畫一次
            if( i === Number(rowIndex) || queenPuzzle[i][colIndex] === noVacanciesSymbol) continue
            queenPuzzle[i][colIndex] = noVacanciesSymbol
        }
        //其右上到左下的路徑都不能放
        for( let i = 0 ; i< queenPuzzle.length ;i++){
            //Q的地方或是已經標示為沒空位的則不用再畫一次
            if( i === Number(rowIndex) || queenPuzzle[i][Number(colIndex) + (Number(rowIndex)-i)] === noVacanciesSymbol) continue
            //畫符號
            queenPuzzle[i][Number(colIndex) + (Number(rowIndex)-i)] = noVacanciesSymbol
        }
        //其左上到右下的路徑都不能放
        for( let i = 0 ; i< queenPuzzle.length ;i++){
            //Q的地方或是已經標示為沒空位的則不用再畫一次
            if( i === Number(rowIndex) || queenPuzzle[i][Number(colIndex) + (i-Number(rowIndex))] === noVacanciesSymbol) continue
            //畫符號
            queenPuzzle[i][Number(colIndex) + (i-Number(rowIndex))] = noVacanciesSymbol
        }
}
/**
 * 棋盤 產生器
 * 負責產生每個位置的Queen要擺在個index的列表清單
 * @param {number} puzzleNumber 必填，代表 n-puzzle 的 n
 * @param {number} firstQueenIndex 必填，選擇第一個queen要擺放的位置 ()
 * @returns {Array<number>}[queenIndexArray] 返回一個每行皇后擺放位置的清單
 */
function queenPuzzleMaker(puzzleNumber, firstQueenIndex = 1){
    const [ rowIndex, colIndex ] = getSplitNumber(firstQueenIndex)
    let queenPuzzle = Array.from(Array(puzzleNumber),()=> new Array(puzzleNumber)) 
    //陣列製作步驟 :
    //1.知道第一顆皇后位置
    queenPuzzle[rowIndex][colIndex] = QUEENSYMBOL
    //2.將其米字路徑設置為不能用
    setNoVacancies(queenPuzzle,firstQueenIndex)
    
    // console.log(queenPuzzle)
    //2.開始在下一行擺放皇后，只能放在還可以放的位置上
      //若該行全部都不能擺放，則表示無解，直接return
    return queenPuzzle
}

// /**
//  * 依照二維陣列畫出棋盤解
//  * @param {number} puzzleNumber 必填，代表 n-puzzle 的 n
//  * @param {*} firstQueenIndex 必填
//  * @returns string ，返回最終 puzzle 輸出
//  */
function solutionMaker(puzzleNumber, firstQueenIndex){
    let result = ''

    const queenIndexArray = queenPuzzleMaker( puzzleNumber, firstQueenIndex )
    queenIndexArray.forEach( row => { 
        let rowResult = ''
        for ( symbol of row ){
            if( !symbol ) rowResult += SPACESYMBOL
            // else if( symbol === noVacanciesSymbol) rowResult += SPACESYMBOL
            else if( symbol === noVacanciesSymbol) rowResult += noVacanciesSymbol  //debug專用
            else if( symbol === QUEENSYMBOL ) rowResult += QUEENSYMBOL
        }
        console.log(rowResult)
        result += rowResult
    })
    return result
}

/**
 * 輸出 puzzle solution 的 main function
 * 
 * @param {number} puzzleNumber 必填，代表 n-puzzle 的 n
 * @param { number } firstQueenIndex 選填，可以指定第一顆皇后的擺放位置 ( 若index範圍不在棋盤反圍內、無法得解都可能造成無法得解 )
 * @returns string ， 返回最終 puzzle 輸出
 */
function puzzleOutput( puzzleNumber, firstQueenIndex = 1 ){
    const [ rowIndex, colIndex ] = getSplitNumber(firstQueenIndex)
    if(firstQueenIndex<0 || rowIndex > puzzleNumber-1 || colIndex > puzzleNumber-1) return console.log('旗子擺放位置超出範圍')
    if( typeof(puzzleNumber)!=='number' ) return console.log('請輸入數字')
    if( !Number.isInteger(puzzleNumber) || puzzleNumber <= 0 ) return console.log('請輸入正整數')
    if( (puzzleNumber % 2) !==0  ) return console.log('請輸入偶數')
    // console.log( solutionMaker(puzzleNumber, firstQueenIndex)) 
    solutionMaker(puzzleNumber, firstQueenIndex)
}

//test
// console.log(puzzleOutput('aa'))  //"請輸入數字"

// console.log(puzzleOutput(-1))     //"請輸入正整數"
// console.log(puzzleOutput(0))    //"請輸入正整數"
// console.log(puzzleOutput(5.5))     //"請輸入正整數"
// console.log(puzzleOutput(-5.5))     //"請輸入正整數"
// console.log(puzzleOutput(9))     //'請輸入偶數'