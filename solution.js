
//題目說明 : 
// Write a function that returns all distinct solutions to the 8-queens puzzle.
// Each solution contains a distinct board configuration of the 8-queens' placement, where 'Q' and '.' both indicate a queen and an empty space respectively.

// --------
// Example solution for 2-queen puzzle
// Output:

// // Solution 1     
// .Q  1 
// Q.  0 

// // Solution 2
// Q.  0 
// .Q  1 

// Example solution for 4-queen puzzle
// Output:

// // Solution 1     
// .Q..  1  
// ...Q  3  
// Q...  0  
// ..Q.  2  


// // Solution 2
// ..Q. 2  
// Q... 0  
// ...Q 3 
// .Q.. 1  

// Example solution for 8-queen puzzle
// Output:

// // Solution 1     
// .Q......  1
// ...Q....  3
// .....Q..  5
// .......Q  7
// Q.......  0
// ..Q.....  2
// ....Q...  4
// ......Q.  6


// // Solution 2
// ......Q.  6
// ....Q..   4
// ..Q.....  2
// Q.......  0
// .......Q  7
// .....Q..  5
// ...Q....  3
// .Q......  1

//樣式修改變數
const QUEENSYMBOL = 'Q' //主要符號
const SPACESYMBOL = '.' //次要符號

//切換輸出結果: 
//打開以下註解，查看不同輸出
//第二個參數不帶，使用預設的 solution 1

// puzzleOutput(2)  //solution1 for 2-queen puzzle
// puzzleOutput(2, 2)  //solution2 for 2-queen puzzle

// puzzleOutput(4)  //solution1 for 4-queen puzzle
// puzzleOutput(4, 2)  //solution2 for 4-queen puzzle

// puzzleOutput(6)  //solution1 for 6-queen puzzle
// puzzleOutput(6, 2)  //solution2 for 6-queen puzzle

// puzzleOutput(8)  //solution1 for 8-queen puzzle
puzzleOutput(8, 2)  //solution2 for 8-queen puzzle

// puzzleOutput(10)  //solution1 for 10-queen puzzle
// puzzleOutput(10, 2)  //solution2 for 10-queen puzzle

//methods

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

/**
 * 棋盤擺放位置清單 產生器
 * 負責產生每個位置的Queen要擺在個index的列表清單
 * @param {*} number 必填，代表 n-puzzle 的 n
 * @param {*} solutionType 必填
 * @returns [part1Array, part2Array] ，返回一個陣列，其中包含兩段棋盤擺放的清單
 */
function placementArrayMaker(number, solutionType){
    //陣列製作步驟 :
    
    //1.做兩個陣列，一邊放奇數，一邊放偶數
    let part1Array = []  //只放奇數
    let part2Array = []  //只放偶數
    for(let i = 0 ; i < number ;i++ ){
        if( (i % 2) == 0 ) part2Array.push(i)
        else part1Array.push(i)
    }
    //2.依據不同方案，製作不同的array
    //  (1)方案一: paet1從1開始，只放奇數 ； part2從0開始，只放偶數
    //  (2)方案二: 直接把方案一part1、part2交換，並將每段裡面的內容相反過來排
    switch(solutionType){
        case 1:
            break
        case 2:
            [part2Array, part1Array] = [part1Array, part2Array] //交換陣列
            part1Array = part1Array.reverse()
            part2Array = part2Array.reverse()
            break
    }
    return [part1Array, part2Array]
}

/**
 * 依據不同 solution type 產生不同 puzzle 棋盤
 * @param {*} number 必填，代表 n-puzzle 的 n
 * @param {*} solutionType 必填
 * @returns string ，返回最終 puzzle 輸出
 */
function solutionMaker(number, solutionType){
    const newLineSymbol = '\n'
    let result = ''

    const [ part1Array, part2Array ] = placementArrayMaker( number, solutionType)
    part1Array.forEach( placementIndex => { 
        result += drawPuzzle(number, placementIndex, QUEENSYMBOL, SPACESYMBOL) + newLineSymbol
    })
    part2Array.forEach( ( placementIndex, index ) => { 
        if( index === number/2-1 ) result += drawPuzzle(number, placementIndex, QUEENSYMBOL, SPACESYMBOL) //每個字串後都要加一個換行符號，除了最後一個不用加
        else result += drawPuzzle(number, placementIndex, QUEENSYMBOL, SPACESYMBOL) + newLineSymbol 
    })
    return result
}

/**
 * 輸出 puzzle solution 的 main function
 * 
 * @param {*} number 必填，代表 n-puzzle 的 n 
 * @param { } solutionType 選填，預設為solution 1
 * @returns string ， 返回最終 puzzle 輸出
 */
function puzzleOutput( number, solutionType = 1 ){
    if( typeof(number)!=='number' ) return '請輸入數字'
    if( !Number.isInteger(number) || number <= 0 ) return '請輸入正整數'
    if( (number % 2) !==0  ) return '請輸入偶數'
    console.log( solutionMaker(number, solutionType) ) 
}

//test
// console.log(puzzleOutput('aa'))  //"請輸入數字"

// console.log(puzzleOutput(-1))     //"請輸入正整數"
// console.log(puzzleOutput(0))    //"請輸入正整數"
// console.log(puzzleOutput(5.5))     //"請輸入正整數"
// console.log(puzzleOutput(-5.5))     //"請輸入正整數"
// console.log(puzzleOutput(9))     //'請輸入偶數'