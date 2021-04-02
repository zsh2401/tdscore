

<div align="center">

# Warning: this library is stll developing, do not use this under production env.

![](./icon.png)

# 😊 [TDSCore](http://ds.zsh2401.top)

English | [中文](./README.md)

```sh
npm i tdscore
```

Data Structure, Algorithms, Mathmatics code, and extension to ECMA Script written by almost pure TypeScript✨


[![Test](https://github.com/zsh2401/tdscore/actions/workflows/test.yml/badge.svg)](https://github.com/zsh2401/tdscore/actions/workflows/test.yml)
[![Publish](https://github.com/zsh2401/tdscore/actions/workflows/publish.yml/badge.svg)](https://github.com/zsh2401/tdscore/actions/workflows/publish.yml)
![](https://img.shields.io/github/languages/top/zsh2401/tdscore)
[![](https://img.shields.io/codecov/c/github/zsh2401/tdscore)](https://app.codecov.io/gh/zsh2401/tdscore)
[![dependencies Status](https://status.david-dm.org/gh/zsh2401/tdscore.svg)](https://david-dm.org/zsh2401/tdscore)

[![NPM version](https://img.shields.io/npm/v/tdscore.svg)](https://www.npmjs.com/package/tdscore)
![](https://badgen.net/npm/dy/tdscore)
![](https://img.shields.io/bundlephobia/minzip/tdscore)
</div>

# Features
* Readable: Designed for learning.🌌
* Run everywhere: using only ES5 syntaxes.
* Small: Minified and gzipped only 22.4KiB（v0.1.26)。
* Can be compiled to binary.see [tdscore-app-template](https://github.com/zsh2401/tdscore-app-template)

# Install
```sh
npm install tdscore --save
```
Browser
```html
<srcipt src="//cdn.jsdelivr.net/npm/tdscore/dist/tdscore.min.js"></script>
```

# Usage🎉
```typescript
import { HashMap } from "tdscore"

let hashMap = new HashMap<string,number>();

hashMap.mapPut("a",1);
console.log(hashMap.mapGet("a")); // 1
```
TDSCore can be also imported with following ways：
* Global Variable `window.tdscore`
* CommonJS `require("tdscore")`

BTW, you can try TDSCore without configure any thing on RunKit.

[RunKit for TDSCore](https://npm.runkit.com/tdscore)

# Document 🍕
[**View online document in official website**](http://ds.zsh2401.top)

# Join development🤝
您可以[使用Github1s在线浏览代码](https://github1s.com/zsh2401/tdscore/)，也可以直接将代码克隆到本地。

## Clone & Checkout
```sh
git clone https://github.com/zsh2401/tdscore.git
cd tdscore
git fetch origin dev
git checkout dev
```
## Install dependencies
```sh
yarn
```
## Build & Test
```sh
# UMD Bundle file.
yarn build:dist 

# ES6
yarn build:es 

# ES5
yarn build:lib 

# All above
yarn build
```
### Unit Test
```sh
yarn test
```

Notice:
* Please write your code at dev branch.
* Pull requests are always welcomed.

# Contributors

<a href="https://github.com/zsh2401/tdscore/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zsh2401/tdscore" />
</a>

# License
TDSCore is licensed under [Mulan PSL v2](http://license.coscl.org.cn/MulanPSL2).