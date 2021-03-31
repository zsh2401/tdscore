# 警告: 此库仍在开发中，请勿用于生产环境

<div align="center">

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
</div>

   


# 特性
* 可读性高: 开发的首要目标为研习🌌
* 到处运行: 编译产物仅使用ES5语法特性。
* 麻雀虽小：压缩传输仅19.1KiB（v0.1.16)。
* 一系列对ES的拓展
* 能够被编译为二进制可执行程序。查看[tdscore-app-template](https://github.com/zsh2401/tdscore-app-template)

# 快速上手
TDSCore支持AMD，CommonJS，ES Module以及全局变量等模块化方式。

## 安装
NPM
```sh
npm i tdscore
#or
yarn add tdscore
```
浏览器
```html
<srcipt src="//cdn.jsdelivr.net/npm/tdscore/dist/tdscore.min.js"></script>
```

### 引入🎉
```typescript
//浏览器🌐
const HashMap = tdscore.HashMap;

//ES Module🍪
import { HashMap } from "tdscore"

//Common JS🛵
const tdscore = require("tdscore");
const HashMap = tdscore.HashMap;

//Tree Shaking🛸
import HashMap from "tdscore/lib/data-structure/map/HashMap"

```
### 使用示例
```typescript
//TypeScript
let hashMap = new HashMap<string,number>();
//ECMAScript 5
var hashMap = new HashMap();

hashMap.mapPut("a",1);
console.log(hashMap.mapGet("a")); // 1
```
# 在RunKit上尝试
T您不需要配置任何开发环境。 
[RunKit for TDSCore](https://npm.runkit.com/tdscore)

# 文档 🍕
[查看官网](http://ds.zsh2401.top)

# 加入开发🤝
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

# 执行上面全部s
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

