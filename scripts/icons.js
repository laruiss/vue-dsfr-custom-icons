// @ts-check
import { icons as mdiCollection } from '@iconify-json/mdi'
import { icons as riCollection } from '@iconify-json/ri'

/**
 * @type {string[]}
 */
const riIconNames = [
  'flag-line',
  'home-4-line',
  'question-mark',
]

/**
 * @type {string[]}
 */
const mdiIconNames = [
  'user-heart',
  'user-key',
]

/**
 * @type {[import('@iconify/vue').IconifyJSON, string[]][]}
 */
export const collectionsToFilter = [
  [riCollection, riIconNames],
  [mdiCollection, mdiIconNames],
]
