

<div align="center">

# 警告: 此库仍在开发中，请勿用于生产环境

![](./icon.png)

# 😊 [TDSCore](http://ds.zsh2401.top)

中文 | [English](./README-en-US.md)

```sh
npm i tdscore
```

几乎使用纯TypeScript实现的数据结构，算法，数学程式，以及对ECMA Script的拓展。✨


[![Test](https://github.com/zsh2401/tdscore/actions/workflows/test.yml/badge.svg)](https://github.com/zsh2401/tdscore/actions/workflows/test.yml)
[![Publish](https://github.com/zsh2401/tdscore/actions/workflows/publish.yml/badge.svg)](https://github.com/zsh2401/tdscore/actions/workflows/publish.yml)
![](https://img.shields.io/github/languages/top/zsh2401/tdscore)
[![](https://img.shields.io/codecov/c/github/zsh2401/tdscore)](https://app.codecov.io/gh/zsh2401/tdscore)
[![dependencies Status](https://status.david-dm.org/gh/zsh2401/tdscore.svg)](https://david-dm.org/zsh2401/tdscore)

[![NPM version](https://img.shields.io/npm/v/tdscore.svg)](https://www.npmjs.com/package/tdscore)
![](https://badgen.net/npm/dy/tdscore)
![](https://img.shields.io/bundlephobia/minzip/tdscore)

[![](https://img.shields.io/badge/QQ%E7%BE%A4-181583086-blue)](https://qm.qq.com/cgi-bin/qm/qr?k=nKqxAm6bD7ty6ieZKA31dQrxboBMZmGT&jump_from=webapi)

</div>

# 特性
* 可读性高：开发的首要目标为研习🌌
* 到处运行：编译产物仅使用ES5语法特性。
* 麻雀虽小：压缩传输仅22.4KiB（v0.1.26)。
* 能够被编译为二进制可执行程序。查看[tdscore-app-template](https://github.com/zsh2401/tdscore-app-template)
* 迭代器（灵感来自于`C# Linq`）

# 已经实现
| 线性结构 | 非线性结构 | 算法 | 数学 | 迭代|
| ---- | ---- | ---- | ---- | ---- | 
| CQueue| HashMap |hash|sin | Stream |
| 顺序表 | 图接口 | BFS | cos | append |
| 链表  |AVL |DFS | Martix(OOP) |contains |
| BitSpan| 树接口 | BST | Martix(Classic) | filter|
|Queue |BiTreeNode |bubbleSort | 无限精度(DSNumber) | defaultOrFirst|
| Glist |HashSet | qucikSort | Linear transformation | filter |
| Stack |SetGraph | shellSort | Complex | forEach|
|  |  | radixSort | Hamming Code | indexOf|
| | | insertionSort | Color | isEmpty |
| | | selectionSort | fab | last |
| | | heapSort | |reverse |
| | | seqSearch | |selectMany |
| | | binarySearch ||  size |
| | | prim | |toList/Map/Set |
| | | kruskal| |where |
# 安装 
```sh
npm install tdscore --save
```
浏览器
```html
<srcipt src="//cdn.jsdelivr.net/npm/tdscore/dist/tdscore.min.js"></script>
```

# 使用🎉
```typescript
import { HashMap } from "tdscore"

let hashMap = new HashMap<string,number>();

hashMap.mapPut("a",1);
console.log(hashMap.mapGet("a")); // 1
```
TDSCore同时支持通过以下方式引入：
* 浏览器全局变量 `window.tdscore`
* CommonJS `require("tdscore")`

另外，在RunKit上在线试用，您不需要配置任何开发环境。

[RunKit for TDSCore](https://npm.runkit.com/tdscore)

# 文档 🍕
[**查看在线文档**](http://ds.zsh2401.top)

# 加入开发🤝
您可以[使用Github1s在线浏览代码](https://github1s.com/zsh2401/tdscore/)，也可以直接将代码克隆到本地。

## 克隆并且切换到dev分支
```sh
git clone https://github.com/zsh2401/tdscore.git
cd tdscore
git fetch origin dev
git checkout dev
```
## 安装依赖
```sh
yarn
```
## 构建与测试
```sh
# 打包为umd单文件模块，输出产物位于dist文件夹
yarn build:dist 

# 编译为es6代码，输出产物位于es文件夹
yarn build:es 

# 编译为ES5代码，输出产物位于lib文件夹
yarn build:lib 

# 执行上面全部任务
yarn build
```
### 单元测试
```sh
yarn test
```

注意：
* 请在dev分支上进行开发
* 欢迎PR

# 贡献者

<a href="https://github.com/zsh2401/tdscore/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zsh2401/tdscore" />
</a>

# 协议
TDSCore is licensed under [Mulan PSL v2](http://license.coscl.org.cn/MulanPSL2).