import { build } from "esbuild"
(async () => {
    const ENTRY_POINT = "src/index.ts"
    await Promise.all([
        build({
            entryPoints: ["./umd.ts"],
            bundle: true,
            platform: "browser",
            minify: false,
            sourcemap: true,
            format: "cjs",
            outfile: "dist/tdscore.js"
        }),

        build({
            entryPoints: ["./umd.ts"],
            bundle: true,
            platform: "browser",
            minify: true,
            sourcemap: false,
            format: "cjs",
            outfile: "dist/tdscore.min.js"
        }),

    ])
})();
