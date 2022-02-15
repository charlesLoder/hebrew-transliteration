const { build } = require("esbuild");
const { dependencies } = require("./package.json");

const shared = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  external: Object.keys(dependencies),
  platform: "node"
};

build({
  ...shared,
  outfile: "dist/index.js"
});

build({
  ...shared,
  outfile: "dist/index.esm.js",
  format: "esm"
});

const { Generator } = require("npm-dts");

new Generator({
  entry: "index.ts",
  output: "dist/index.d.ts"
}).generate();
