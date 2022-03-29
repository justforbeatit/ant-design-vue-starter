export function autoload() {
  const views = Object.entries(import.meta.glob('../views/**'))
  console.info(views)
  for (const [key, value] of views) {
    const match = key.match(/.*views\/(.*)\.vue$/)!
    const path = match[1]!.replace('View', '').toLowerCase()
    const name = path.split('/').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join('')
    console.info(path, value, name)
  }
}
