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
    //樣式修改變數  -->可以修改puzzle輸出樣式
    //全局參數      -->全局的變數
    //methods      
      //1.工具方法  -->工具方法，如畫棋盤
      //2.演算法    -->判斷皇后解的一些核心演算法

## 查看solution

# 解題思維
## 參考影片
https://www.youtube.com/watch?v=MozDUrcChCA&t=365s&ab_channel=BytesNBits
## 優化判斷是否是安全位置的邏輯
判斷X兩個方向的時候，<br>
由於兩個都是斜線，而斜線的特性就是兩個座標的x、y相減的絕對值是一樣的<br>
所以可以使用座標值相減絕對值來判斷為斜線
```javascript
//檢查/和\線上有無其他皇后
    if( Math.abs(testCol - solutionArr[row]) === Math.abs(testRow - row)){
        return false
    }
```

# 坑點紀錄
## 遞迴函式的增長條件 - currentRow 不可以用++
因為用++會使原本的currentRow也增加，
而我們只是要call下一個遞迴時，row+1而已，不可以影響原本這個code block的 currentRow
