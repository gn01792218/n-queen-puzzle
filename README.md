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
    //methods      -->核心方法

## 查看solution

# 解題思維
https://www.youtube.com/watch?v=MozDUrcChCA&t=365s&ab_channel=BytesNBits

# 坑點紀錄
## 遞迴函式的增長條件 - currentRow 不可以用++
因為用++會使原本的currentRow也增加，
而我們只是要call下一個遞迴時，row+1而已，不可以影響原本這個code block的 currentRow
## 印出來的所有解都一樣?!
