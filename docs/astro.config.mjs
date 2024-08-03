import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";

// https://astro.build/config
export default defineConfig({
  srcDir: "./docs/src",
  redirects: {
    "/": {
      status: 302,
      destination: "/getting-started/quick-start"
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
