<div align="center">

![](./icon.png)

# 😊TDSCore

Data Structure, Algorithms, Mathmatic codes implenemntes with 99% TypeScript!✨ 

[![Test](https://github.com/zsh2401/tdscore/actions/workflows/test.yml/badge.svg)](https://github.com/zsh2401/tdscore/actions/workflows/test.yml)
[![NPM version](https://img.shields.io/npm/v/tdscore.svg)](https://www.npmjs.com/package/tdscore)
![](https://badgen.net/npm/dy/tdscore)

</div>

   


# Features
* Readable: Designed for study at first🌌.
* Run on EVERYWHERE: Using only ECMAScript 5 features🚄.
* Smaller: 22.5kB minified and gzipped😍.
* A series of tools which can enhance the ability of ECMA Script🚀.

# Getting Started
TDSCore is supporting AMD, CommonJS, ES Moudle and Global variable.

## Install
### [Node.js💖](http://nodejs.org/)
`npm install tdscore`

### Browser👏
```html
<srcipt src="./tdscore.js"></script>
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

# Documents 🍕
It's still writing.

# Contribution 🎁
Please develop on the dev branch.    
Pull Requests are always welcomed.