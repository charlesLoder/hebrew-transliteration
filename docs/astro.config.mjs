import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import { remarkBasePath } from "./prepend_base_path.js";

const basePath = process.env.NODE_ENV === "production" ? "/hebrew-transliteration/" : "/";

// https://astro.build/config
export default defineConfig({
  srcDir: "./docs/src",
  site: "https://charlesLoder.github.io",
  root: "./docs",
  outDir: "docs-dist",
  publicDir: "./docs/public",
  build: {
    assets: "assets"
  },
  base: basePath,
  markdown: {
    remarkPlugins: [[remarkBasePath, { base: basePath }]]
  },
  redirects: {
    "/": {
      status: 302,
      destination: `${basePath}getting-started/quick-start`
    }
  },
  integrations: [
    starlight({
      title: `hebrew-transliteration v${process.env.npm_package_version || ""}`,
      plugins: [
        starlightTypeDoc({
          entryPoints: ["./src/index.ts"],
          tsconfig: "./.config/tsconfig.json",
          typeDoc: {
            expandObjects: true,
            parametersFormat: "table"
          }
        })
      ],
      social: {
        github: "https://github.com/charlesLoder/hebrew-transliteration"
      },
      sidebar: [
        {
          label: "Getting started",
          autogenerate: { directory: "getting-started" }
        },
        // Add the generated sidebar group to the sidebar.
        typeDocSidebarGroup
      ]
    })
  ]
});
