const path = require('path')

// get the path of the dependency "@medusajs/ui"
const medusaUI = path.join(
  path.dirname(require.resolve('@medusajs/ui')),
  '**/*.{js,jsx,ts,tsx}'
)

// Helper to get plugin admin compiled content path
function getPluginContent(packageName) {
  try {
    const pkgPath = require.resolve(`${packageName}/package.json`)
    return path.join(
      path.dirname(pkgPath),
      '.medusa/server/src/admin/**/*.{js,mjs}'
    )
  } catch {
    return null
  }
}

const plugins = [
  '@plugins/reviews',
  '@plugins/wishlist',
  '@plugins/translations',
  '@medusajs/draft-order',
]
  .map(getPluginContent)
  .filter(Boolean)

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@medusajs/ui-preset')],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', medusaUI, ...plugins],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
