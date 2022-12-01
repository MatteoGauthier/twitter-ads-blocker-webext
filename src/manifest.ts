import type { Manifest } from "webextension-polyfill"
import pkg from "../package.json"
import { isDev, port } from "../scripts/utils"

export async function getManifest(): Promise<Manifest.WebExtensionManifest> {
  // update this file to update this manifest.json
  // can also be conditional based on your need
  return {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: "./assets/twitter-ads-blocker-webext-icon-512.png",
      // default_popup: "./dist/popup/index.html",
    },
    // options_ui: {
    //   page: "./dist/options/index.html",
    //   open_in_tab: true,
    //   chrome_style: false,
    // },
    background: {
      service_worker: "./dist/background/index.global.js",
    },
    content_scripts: [
      {
        matches: ["http://*/*", "https://*/*"],
        js: ["./dist/content/index.global.js"],
        css: ["./dist/content/style.css"],
      },
    ],
    icons: {
      16: "./assets/twitter-ads-blocker-webext-icon-16.png",
      32: "./assets/twitter-ads-blocker-webext-icon-32.png",
      48: "./assets/twitter-ads-blocker-webext-icon-48.png",
      128: "./assets/twitter-ads-blocker-webext-icon-512.png",
    },
    permissions: ["activeTab"],
    host_permissions: ["http://*/", "https://*/"],
    // this is required on dev for Vite script to load
    // @todo change this to MV3
    content_security_policy: isDev ? `script-src \'self\' http://localhost:${port}; object-src \'self\'` : undefined,
  }
}
