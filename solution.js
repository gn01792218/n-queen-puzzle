 
//樣式修改變數
const QUEENSYMBOL = 'Q' //主要符號
const SPACESYMBOL = '.' //次要符號
const noVacanciesSymbol = 'X'

//切換輸出結果: 
puzzleOutput(4,33) 
//methods

//工具方法
function getSplitNumberStr(number){
    if(number<10) number = '0'+ number
    return String(number).split("")
}

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
 * 設置皇后米字範圍不能放置其他皇后
 * @param {Array} queenPuzzle :傳入棋盤陣列
 * @param {number} queenIndex 
 */
function setNoVacancies(queenPuzzle,queenIndex){
    const [ queenRowIndex, queenColIndex ] = getSplitNumberStr(queenIndex)
    
     //2.將其米字路徑範圍上的都設置為"不能擺放"
        //如:第一顆02
        //該row全部都不能放(橫)
        // for( let i = 0 ; i< queenPuzzle[queenRowIndex].length ;i++){
        //     //Q的地方或是已經標示為沒空位的則不用再畫一次
        //     if( i === Number(queenColIndex) || (queenPuzzle[queenRowIndex][i] === noVacanciesSymbol)) continue
        //     queenPuzzle[queenRowIndex][i] = noVacanciesSymbol
        // }
        //每一row的第2顆都不能放(直)
        // for( let i = 0 ; i< queenPuzzle.length ;i++){
        //     //Q的地方或是已經標示為沒空位的則不用再畫一次
        //     if( i === Number(queenRowIndex) || queenPuzzle[i][queenColIndex] === noVacanciesSymbol) continue
        //     queenPuzzle[i][queenColIndex] = noVacanciesSymbol
        // }
        //其右上到左下的路徑都不能放
        for( let i = 0 ; i< queenPuzzle.length ;i++){
            //Q的地方或是已經標示為沒空位的則不用再畫一次
            console.log(i)
            if( i === Number(queenRowIndex) || queenPuzzle[i][Number(queenColIndex) + (Number(queenRowIndex)-i)] === noVacanciesSymbol) continue
            //超出表格也不用畫
            // if( i > Number(queenRowIndex)) continue
            //畫符號
            queenPuzzle[i][Number(queenColIndex) + (Number(queenRowIndex)-i)] = noVacanciesSymbol
            console.log('畫在',i,Number(queenColIndex) + (Number(queenRowIndex)-i))
        }
        //其左上到右下的路徑都不能放
        // for( let i = 0 ; i< queenPuzzle.length ;i++){
        //     //Q的地方或是已經標示為沒空位的則不用再畫一次
        //     if( i === Number(queenRowIndex) || queenPuzzle[i][Number(queenColIndex) + (i-Number(queenRowIndex))] === noVacanciesSymbol) continue
        //     //超出表格也不用畫
        //     // if( i > Number(queenRowIndex)) continue
        //     //畫符號
        //     queenPuzzle[i][Number(queenColIndex) + (i-Number(queenRowIndex))] = noVacanciesSymbol
        // }
}

function setRowQueen(puzzleNumber, queenPuzzle, puzzleRow) {
    // if(puzzleRow > puzzleNumber-1) return
    let row = puzzleRow
    let canSetQueen = false
    console.log('設置第',puzzleRow,'行皇后')
    queenPuzzle[row].forEach( (symbol,index) =>{
        //若該行有空位能設置皇后
        if( symbol !== noVacanciesSymbol && symbol !== QUEENSYMBOL) { 
            // queenPuzzle[row][index] = QUEENSYMBOL
            // setNoVacancies( queenPuzzle, Number(puzzleRow+''+index))
            canSetQueen = true
            console.log('皇后設置在',Number(row+''+index))
            return
        }
    } )
    
    if( row === puzzleNumber-1 ) { //檢查最後一行
        console.log('最後一行是',puzzleRow,puzzleNumber-1,'設置成功與否',canSetQueen)
        // if(!canSetQueen ) return 'No Solution'  //最後一次如果不能設置皇后表示無解
        return 'Set All Queen Success!'
    }
    row++
    setRowQueen(puzzleNumber, queenPuzzle, row)
}

/**
 * 棋盤 產生器 (會產生一種解)
 * 負責產生每個位置的Queen要擺在個index的列表清單
 * @param {number} puzzleNumber 必填，代表 n-puzzle 的 n
 * @param {number} firstQueenIndex 必填，選擇第一個queen要擺放的位置
 * @returns {Array<number>}[queenIndexArray] 返回一個每行皇后擺放位置的清單 ( 一種解 )
 */
function queenPuzzleMaker(puzzleNumber, firstQueenIndex = 1){
    const [ queenRowIndex, queenColIndex ] = getSplitNumberStr(firstQueenIndex)
    let queenPuzzle = initPuzzle(puzzleNumber)
    //陣列製作步驟 :
    //1.放置第一顆皇后，並將其米字路徑設置為不能使用
    queenPuzzle[queenRowIndex][queenColIndex] = QUEENSYMBOL
    setNoVacancies(queenPuzzle,firstQueenIndex)
    //2.開始遞迴queenPuzzleMaker在下一行可以擺放的位置上放皇后
    // let scuessSet = setRowQueen(puzzleNumber, queenPuzzle,0)
    // console.log(scuessSet)
    return queenPuzzle
}

// /**
//  * 依照二維陣列畫出一種棋盤解
//  * @param {number} puzzleNumber 必填，代表 n-puzzle 的 n
//  * @param {*} firstQueenIndex 必填
//  * @returns string ，返回最終 puzzle 輸出
//  */
function solutionMaker(puzzleNumber, firstQueenIndex){
    const newLinrSymbol = '\n'
    let result = ''

    const queenIndexArray = queenPuzzleMaker( puzzleNumber, firstQueenIndex )
    queenIndexArray.forEach( row => { 
        let rowResult = ''
        row.forEach( (symbol,index) =>{
            if( !symbol ) rowResult += SPACESYMBOL
            // else if( symbol === noVacanciesSymbol) rowResult += SPACESYMBOL
            else if( symbol === noVacanciesSymbol) rowResult += noVacanciesSymbol  //debug專用
            else if( symbol === QUEENSYMBOL ) rowResult += QUEENSYMBOL
            if(index === puzzleNumber-1) rowResult += newLinrSymbol
        } )
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
    const [ queenRowIndex, queenColIndex ] = getSplitNumberStr(firstQueenIndex)
    if(firstQueenIndex<0 || queenRowIndex > puzzleNumber-1 || queenColIndex > puzzleNumber-1) return console.log('旗子擺放位置超出範圍')
    if( typeof(puzzleNumber)!=='number' ) return console.log('請輸入數字')
    if( !Number.isInteger(puzzleNumber) || puzzleNumber <= 0 ) return console.log('請輸入正整數')
    if( (puzzleNumber % 2) !==0  ) return console.log('請輸入偶數')
    console.log(solutionMaker(puzzleNumber, firstQueenIndex))
    // solutionMaker(puzzleNumber, firstQueenIndex)
}

//test
// console.log(puzzleOutput('aa'))  //"請輸入數字"

// console.log(puzzleOutput(-1))     //"請輸入正整數"
// console.log(puzzleOutput(0))    //"請輸入正整數"
// console.log(puzzleOutput(5.5))     //"請輸入正整數"
// console.log(puzzleOutput(-5.5))     //"請輸入正整數"
// console.log(puzzleOutput(9))     //'請輸入偶數'