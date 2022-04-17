import { build } from "esbuild"

(async () => {
    await Promise.all([
        
        build({
            entryPoints: ["./src/umd.ts"],
            bundle: true,
            platform: "browser",
            minify: false,
            sourcemap: true,
            format: "cjs",
            outfile: "dist/tdscore.js"
        }),

        build({
            entryPoints: ["./src/umd.ts"],
            bundle: true,
            platform: "browser",
            minify: true,
            sourcemap: false,
            format: "cjs",
            outfile: "dist/tdscore.min.js"
        }),

    ])
})();
