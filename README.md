# 😊TDSCore
Data Structure, Algorithms, Mathmatic codes implenemntes with 99% TypeScript.✨    

[![Test](https://github.com/zsh2401/tdscore/actions/workflows/test.yml/badge.svg)](https://github.com/zsh2401/tdscore/actions/workflows/test.yml)
[![NPM version](https://img.shields.io/npm/v/tdscore.svg)](https://www.npmjs.com/package/tdscore)
![](https://badgen.net/npm/dy/tdscore)

# Features
* Readable: Designed for study at first🌌.
* Runs on everywhere: Using only ECMAScript 5 features🚄.
* Smaller: 22.5kB minified and gzipped😍.
* A series of tools which can enhance the ability of ECMA Script🚀.

# Load
TDSCore is supporting AMD, CommonJS, ES Moudle and Global variable.

## [Node.js](http://nodejs.org/)
`npm install tdscore`

## Browser👏
```html
<srcipt src="./tdscore.js"></script>
```

# Usage
## Import & Basic usage🎉
```typescript
//Browser
const HashMap = tdscore.HashMap;

//ES Module
import { HashMap } from "tdscore"

//Common JS
const tdscore = require("tdscore");
const HashMap = tdscore.HashMap;

//Tree Shaking
import HashMap from "tdscore/lib/data-structure/map/HashMap"

/**
 * Usage
 **/ 

//TypeScript
let hashMap = new HashMap<string,number>();
//JavaScript
var hashMap = new HashMap();

hashMap.mapPut("a",1);

console.log(hashMap.mapGet("a")); // 1

```
# Documents 🍕
It's still writing.

# Contribution 🎁
Please develop on the dev branch.    
Pull Requests are always welcomed.