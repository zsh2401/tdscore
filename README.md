# WARNING: This library is still developing, do not use this under production environment.

<div align="center">

![](./icon.png)

# 😊 [TDSCore](http://tc.zsh2401.top)

Data Structure, Algorithms, Mathmatic codes implements with almost pure TypeScript!✨ 


[![Test](https://github.com/zsh2401/tdscore/actions/workflows/test.yml/badge.svg)](https://github.com/zsh2401/tdscore/actions/workflows/test.yml)
[![Publish](https://github.com/zsh2401/tdscore/actions/workflows/publish.yml/badge.svg)](https://github.com/zsh2401/tdscore/actions/workflows/publish.yml)
![](https://img.shields.io/github/languages/top/zsh2401/tdscore)
![](https://img.shields.io/codecov/c/github/zsh2401/tdscore)

[![NPM version](https://img.shields.io/npm/v/tdscore.svg)](https://www.npmjs.com/package/tdscore)
![](https://badgen.net/npm/dy/tdscore)
![](https://img.shields.io/bundlephobia/minzip/tdscore)
</div>

   


# Features
* Readable: Designed for study at first🌌.
* Run on EVERYWHERE: Using only ECMAScript 5 features🚄.
* Smaller:  19.1kB minified and gzipped😍(v0.1.16).
* A series of tools which can enhance the ability of ECMA Script🚀.

# Getting Started
TDSCore is supporting AMD, CommonJS, ES Moudle and Global variable.

## Install
### [Node.js💖](http://nodejs.org/)
`npm install tdscore`

### Browser👏
```html
<srcipt src="//cdn.jsdelivr.net/npm/tdscore/dist/tdscore.min.js"></script>
```

### Import🎉
```typescript
//Browser🌐
const HashMap = tdscore.HashMap;

//ES Module🍪
import { HashMap } from "tdscore"

//Common JS🛵
const tdscore = require("tdscore");
const HashMap = tdscore.HashMap;

//Tree Shaking🛸
import HashMap from "tdscore/lib/data-structure/map/HashMap"

```
### Example of usage
```typescript
//TypeScript
let hashMap = new HashMap<string,number>();
//ECMAScript 5
var hashMap = new HashMap();

hashMap.mapPut("a",1);
console.log(hashMap.mapGet("a")); // 1
```
# Try on RunKit
Try any Node.js package right in your browser.   
[RunKit for TDSCore](https://npm.runkit.com/tdscore)

# Documents 🍕
[View on website](http://tc.zsh2401.top/docs)

# Join in development🤝
## Clone and checkout to dev
```sh
git clone https://github.com/zsh2401/tdscore.git
cd tdscore
git fetch origin dev
git checkout dev
```
## Install dependencies
```sh
yarn ci
```
## Build & Test
```sh
# Build bundle files in dist
yarn build:dist 
# Compiling target is ECMAScript6
yarn build:es 
# Compiling target is ES5 and CommonJS
yarn build:lib 

# Run all of above
yarn build
```
### Unit Test
```sh
yarn test
#or
yarn test:coverage
```
Notice:
* Please commit at dev branch.
* Pull requrest are always welcomed.

<!-- <div align="center"> -->

# Contributors

<a href="https://github.com/zsh2401/tdscore/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=zsh2401/tdscore" />
</a>

<!-- </div> -->
