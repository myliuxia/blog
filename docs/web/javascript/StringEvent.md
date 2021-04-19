# String常用方法总结
### 1、substring() 和 substr() （不改变原字符串）
substring(start,end): start开始位置的索引,end结束位置索引, 截取后不改变原来字符串，返回一个新的字符串。

只传一个参数表示从这个位置截取到最后
``` javascript
  var str = "apple"
  var new_str = str.substring(1) //表示从索引1开始到字符串结束
  console.log(new_str) //pple
```
截取的位置不包含结束位置的字符
``` javascript
  var str = "apple"
  var new_str = str.substring(1,4) //表示从索引1开始到字符串结束
  console.log(new_str) //ppl
```

substr(star,end)：start开始位置索引,end需要返回的字符个数 截取后不改变原来字符串，返回一个新的字符串

只传一个参数表示直接到最后
``` javascript
  var str='abcdefg'
  str.substr(1) //bcdefg   
  str.substr(1,1) //b
```

### 2、charAt() 和 charCodeAt()
charAt(index):返回指定索引位置处的字符。如果超出有效范围的索引值返回空字符串.
``` javascript
  var str = "fuck"
  console.log(str.charAt(3)) // k
  console.log(str.charAt(9) // ""空字符串
```

charCodeAt(index):返回指定下标位置的字符的unicode编码,这个返回值是 0 - 65535 之间的整数
``` javascript
  var str="hello world";
  str.charCodeAt(1); // 101
  str.charCodeAt(-2); // NaN
```

### 3、indexOf() 和 lastIndexOf()
indexOf(string)：返回String对象内第一次出现子字符串位置。如果没有找到子字符串，则返回-1。
``` javascript
  var str = "how many people?"
  console.log(str.indexOf("m"))//4
  console.log(str.indexOf("wo"))//-1
  console.log(str.indexOf(" "))//3
```
lastIndexOf(string) : 返回String对象内最后一次出现子字符串位置。如果没有找到子字符串，则返回-1。
``` javascript
  var str = "abcdefghigha"
  console.log(str.lastIndexOf("a"))//11
  console.log(str.lastIndexOf("b"))//1
```

### 4、split()
split(arg1，arg2)：用于把一个字符串分割成字符串数组。第一个参数为字符串或正则表达式，第二个参数为数组最大长度，不填表示不限长度
``` javascript
  var str="How are you doing today?"
  document.write(str.split(" ")) // How,are,you,doing,today?
  document.write(str.split("") ) // H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?
  document.write(str.split(" ",3)) // How,are,you
```

### 5、toLowerCase() 和 toUpperCase()
toLowerCase():返回一个字符串，该字符串中的字母都被转换成小写
toUpperCase():返回一个字符串，该字符串中的字母都被转换成大写

``` javascript
  var str = "wobushiZZde KuaiiLE"
  console.log(str.toLowerCase());//wobushizzde kuaiile
  console.log(str.toUpperCase());//WOBUSHIZZDE KUAIILE
```

### 6、replace() 
replace(): 在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
``` javascript
  var str="hello WORLD";
  var reg=/o/ig; //o为要替换的关键字，不能加引号，否则替换不生效，i忽略大小写，g表示全局查找。
  var str1=str.replace(reg,"**")
  console.log(str1); //hell** W**RLD
```

### 7、match() 
match(): 返回所有查找的关键字内容的数组。
``` javascript
  var str="To be or not to be";
  var reg=/to/ig;
  var str1=str.match(reg);
  console.log(str1); //["To", "to"]
  console.log(str.match("Hello")); //null
```