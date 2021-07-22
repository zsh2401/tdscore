import { build } from "esbuild"
(async () => {
    const ENTRY_POINT = "src/index.ts"
    await Promise.all([
        build({
            entryPoints: [ENTRY_POINT],
            bundle: true,
            platform: "browser",
            minify: false,
            sourcemap: true,
            format: "iife",
            outfile: "dist/tdscore.browser.js"
        }),

        build({
            entryPoints: [ENTRY_POINT],
            bundle: true,
            platform: "browser",
            format: "iife",
            outfile: "dist/tdscore.browser.min.js"
        })

    ])
})();
