import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

sharp.cache(false); // Windows: don't keep image files locked after reading them

/**
 * `import img from "./photo.webp?meta"` returns
 *   { src, width, height, srcSet }
 * so every <img> carries real width/height (no layout shift) and a responsive
 * srcSet: smaller copies (480/800/1200 px wide) are generated into a cache,
 * so phones download ~30-60 KB instead of 100-200 KB. Works in dev, client
 * build and SSR build.
 */
function imageMeta() {
  const CACHE = path.resolve("node_modules/.cache/responsive-images");
  const WIDTHS = [480, 800, 1200];
  const fwd = (p) => p.split(path.sep).join("/");
  return {
    name: "image-meta",
    enforce: "pre",
    async load(id) {
      if (!id.endsWith("?meta")) return null;
      const file = id.slice(0, -"?meta".length);
      this.addWatchFile(file);
      const input = fs.readFileSync(file); // read once; avoids Windows file locks
      const { width, height } = await sharp(input).metadata();
      fs.mkdirSync(CACHE, { recursive: true });
      const base = path.basename(file, path.extname(file));
      const imports = [];
      const parts = [];
      for (const w of WIDTHS.filter((w) => w < width - 100)) {
        const out = path.join(CACHE, `${base}-${w}.webp`);
        if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(file).mtimeMs) {
          await sharp(input).resize({ width: w }).webp({ quality: 74, effort: 5 }).toFile(out);
        }
        imports.push(`import v${w} from ${JSON.stringify(fwd(out))};`);
        parts.push(`v${w} + " ${w}w"`);
      }
      parts.push(`src + " ${width}w"`);
      // Fallback <img src> (used by browsers without srcset support, and by
      // crawlers/audit tools that ignore srcset): the ~800px copy, not the original.
      const fb = WIDTHS.includes(800) && 800 < width - 100 ? "v800" : "src";
      return [
        `import src from ${JSON.stringify(file)};`,
        ...imports,
        `export default { src, fallback: ${fb}, width: ${width}, height: ${height}, srcSet: [${parts.join(", ")}].join(", ") };`,
      ].join("\n");
    },
  };
}

export default defineConfig({
  plugins: [imageMeta(), react()],
});
