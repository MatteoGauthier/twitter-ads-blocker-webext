// generate stub index.html files for dev entry
import chokidar from "chokidar"
import fs from "fs-extra"
import { getManifest } from "../src/manifest"
import { isDev, log, r } from "./utils"

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  // const views = []

  // for (const view of views) {
  //   await fs.ensureDir(r(`extension/dist/${view}`))
  //   let data = await fs.readFile(r(`views/${view}/index.html`), "utf-8")
  //   data = data.replace('"./main.tsx"', `"http://localhost:${port}/${view}/main.tsx"`)
  //   // .replace('<div id="root"></div>', '<div id="root">Vite server did not start</div>')
  //   await fs.writeFile(r(`extension/dist/${view}/index.html`), data, "utf-8")
  //   log("PRE", `stub ${view}`)
  // }
}

export async function writeManifest() {
  await fs.writeJSON(r("extension/manifest.json"), await getManifest(), { spaces: 2 })
  log("PRE", "write manifest.json")
}

writeManifest()

if (isDev) {
  stubIndexHtml()
  chokidar.watch(r("views/**/*.html")).on("change", () => {
    stubIndexHtml()
  })
  chokidar.watch([r("src/manifest.ts"), r("package.json")]).on("change", () => {
    writeManifest()
  })
}
