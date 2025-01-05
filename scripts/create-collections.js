// @ts-check
import { exec } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { promisify } from 'node:util'
import chalk from 'chalk'
import { Command } from 'commander'

const program = new Command()

program
  .option('-s, --source <filepath>', 'Chemin vers le fichier de tuples [IconifyJSON, string[]]')
  .option('-t, --target <filepath>', 'Chemin vers le fichier destination (src/icons.ts par défaut)')
  .parse(process.argv)

const options = program.opts()

const execPromise = promisify(exec)

/**
 * @type {[import('@iconify/vue').IconifyJSON, string[]][]}
 */
const collectionsToFilter = await import(path.resolve(process.cwd(), options.source)).then(({ collectionsToFilter }) => collectionsToFilter)

const collections = collectionsToFilter.map(tuple => filterIcons(...tuple))

const code = `import type { IconifyJSON } from '@iconify-json/ri'
const collections: IconifyJSON[] = ${JSON.stringify(collections)}
export default collections`

await writeFile(path.resolve(process.cwd(), options.target), code)

await runShellCommand(`npx eslint ${path.resolve(process.cwd(), options.target)} --fix`)
console.log(chalk.green('Les icônes ont été générées'))

/**
 * Fonctions utilitaires
 */

/**
 * Filtre les icônes d'une collection en fonction d'une liste de noms.
 * @function
 *
 * @param {import('@iconify/vue').IconifyJSON} collection - La collection d'icônes.
 * @param {string[]} iconNames - La liste des noms d'icônes à conserver.
 *
 * @returns {import('@iconify/vue').IconifyJSON} - Une nouvelle collection filtrée.
 */
function filterIcons (collection, iconNames) {
  const icons = Object.fromEntries(Object.entries(collection.icons).filter(([key]) => {
    return iconNames.includes(key)
  }))
  const { lastModified, aliases, provider, ...useful } = collection
  return {
    ...useful, // prefix, width, height
    icons
  }
}

/**
 * Lance une commande shell.
 * @function
 *
 * @param {string} command - La commande shell à lancer
 *
 * @returns {Promise<undefined>} - Une nouvelle collection filtrée.
 */
export async function runShellCommand (command) {
  try {
    const { stdout, stderr } = await execPromise(command)
    if (stderr) {
      console.error('Erreur :', stderr)
    }
    console.log(stdout)
  }
  catch (error) {
    console.error('Erreur d’exécution :', error)
  }
}
