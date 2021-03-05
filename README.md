# 😊TDSCore
Data Structure & Algorithms implenemntes with pure TypeScript.✨    
Runs on any JavaScript runtime(Browser, Node.js,etc.).

[![Test](https://github.com/zsh2401/tdscore/actions/workflows/test.yml/badge.svg)](https://github.com/zsh2401/tdscore/actions/workflows/test.yml)
[![NPM version](https://img.shields.io/npm/v/tdscore.svg)](https://www.npmjs.com/package/tdscore)
![](https://badgen.net/npm/dy/tdscore)

# Install

## NPM💖
`npm install tdscore`

## Script tag👏
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
# Documents
It's still writing.

# Contribute
Pull Requests are always welcomed.