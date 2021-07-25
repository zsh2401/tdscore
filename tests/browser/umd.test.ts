import { build } from "esbuild"
import path from "path"
import "ts-jest"
import jsdom, { JSDOM } from "jsdom"
import { hash, toString } from "../../src"

describe("UMD Test", () => {

    it("CommonJS", async () => {
        await build({
            entryPoints: [path.join(__dirname, "../../src/umd.ts")],
            bundle: true,
            platform: "browser",
            minify: true,
            sourcemap: false,
            format: "cjs",
            outfile: path.join(__dirname, "../../dist/tdscore.fortest.js")
        })

        const tdscore = require(path.join(__dirname, "../../dist/tdscore.fortest.js"))

        expect(typeof tdscore.hash).toEqual("function")
    })

    it("Browser", async () => {

        await build({
            entryPoints: [path.join(__dirname, "../../src/umd.ts")],
            bundle: true,
            platform: "browser",
            minify: true,
            sourcemap: false,
            format: "cjs",
            outfile: path.join(__dirname, "./tdscore.min.js")
        })

        const dom = await JSDOM.fromFile(path.join(__dirname, "./index.html"),
            {
                runScripts: "dangerously", resources: "usable"
            }
        )
        await new Promise<void>((resolve) => {
            setTimeout(resolve, 500)
        })

        const hashStr = dom.window.document.querySelector("#mark").innerHTML
        expect(hashStr).toBe(toString(hash("ABC")))
    })
})