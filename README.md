# n-queens puzzle 介紹
## 執行檔案
打開vsCode，開啟終端指令，輸入以下
```
node solution.js
```

# 檔案區域導覽 :

## *檔案區塊說明 :
檔案中以註解區分出四大區塊<br>
<br>
solution.js
```html
    //題目說明
    //切換輸出結果  -->可切換執行檔案後的輸出結果
    //樣式修改變數  -->可以修改puzzle輸出樣式
    //methods      -->核心方法
    //test         -->個人測試用
```


## *查看不同solution
1.到代碼中的  //切換輸出結果: 區域，依據需求，打開註解( ctrl+/ )<br>
  例如想查看 4-queens solution 1
```javascript
//切換輸出結果: 
//打開以下註解，查看不同輸出
//第二個參數不帶，使用預設的 solution 1

// puzzleOutput(2)  //solution1 for 2-queen puzzle
// puzzleOutput(2, 2)  //solution2 for 2-queen puzzle

puzzleOutput(4)  //solution1 for 4-queen puzzle
// puzzleOutput(4, 2)  //solution2 for 4-queen puzzle

```
2.直接更改puzzleOutput(  )方法參數<br>

## *更改puzzle輸出樣式
修改以下兩個變數，以更改符號
可以更改代表Queen及空格的符號，預設是Q和.<br>

```javascript
//樣式修改變數
const QUEENSYMBOL = '女王' //主要符號
const SPACESYMBOL = '_' //次要符號

//輸出結果展示 
//solution2 for 4-queen puzzle
__女王_
女王___
___女王
_女王__

```
          