// Write a function that returns all distinct solutions to the 8-queens puzzle.

// Each solution contains a distinct board configuration of the 8-queens' placement, where 'Q' and '.' both indicate a queen and an empty space respectively.

// --------
// Example solution for 4-queen puzzle
// Output:

// // Solution 1
// .Q..  
// ...Q  
// Q...  
// ..Q.  


// // Solution 2
// ..Q. 
// Q... 
// ...Q 
// .Q.. 

const PUZZLENUMBER = 8 //常數，可以控制PUZZLE的最大數量
const MAINSYMBOL = 'Q' //主要符號
const SECONDARYSYMBOL = '.' //次要符號
const solutionType = 2 //目前使用哪一種解決方案


function placePuzzle(puzzleNumber, placementIndex, mainSymbol, secondarySymbol){
    //依序把main放在第index個，然後剩下的用second填滿
    let result = ''
    for ( let i = 0 ; i < puzzleNumber ; i++){
        result += secondarySymbol
    }
    const insertMainSymbol = result.split('')
    insertMainSymbol[placementIndex] = mainSymbol
    result = insertMainSymbol.join('')
    return result
}

//依照不同解決方案，擺出不同佈局
function solutionMaker(solutionType){
    //每個字串後都要加一個換行符號，除了最後一個不用加
    //依據number決定要輸出多少個組合
    const newLineSymbol = '\n'
    let result = ''
    //layoutType 1
    //Q第二 Q尾 Q頭 Q倒數1
    // for(let i = 0 ; i< number ; i++) {
    //     if( i == 0 && number ==1 ) result += MAINSYMBOL
    //     else if( i == 0) result += placePuzzle(number, i, MAINSYMBOL, SECONDARYSYMBOL) + newLineSymbol  //第一個
    //     else if( i == number-1 ) result += placePuzzle(number, i, MAINSYMBOL, SECONDARYSYMBOL)    //最後一個
    //     else result += placePuzzle(number, i, MAINSYMBOL, SECONDARYSYMBOL) + newLineSymbol     //其他的
    // }
    return result
}

//這個要改成，可以選擇兩種方案
function puzzleOutput( number, solutionType = 1 ){
    if( typeof(number)!=='number' ) return '請輸入數字'
    if( number < 1 || number > PUZZLENUMBER ) return `請輸入介於1~${PUZZLENUMBER}之正整數`
    if( !Number.isInteger(number) ) return '請輸入正整數'
    return solutionMaker(solutionType)
}

//test
// console.log(puzzleOutput('aa'))  //"請輸入數字"

// console.log(puzzleOutput(-1))     //"請輸入介於1~8"之正整數
// console.log(puzzleOutput(0))    //"請輸入介於1~8"之正整數
// console.log(puzzleOutput(9))     //"請輸入介於1~8"之正整數
// console.log(puzzleOutput(5.5))     //請輸入正整數

console.log(puzzleOutput(4))