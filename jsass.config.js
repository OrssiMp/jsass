/**
 * jsass.config.js
 * Configuration simple pour les scripts `build` et `dev`.
 * - entries: liste d'objets { src, dest }
 * - extension: extension des fichiers d'entrée (par défaut '.jsass')
 * - watch: tableaux de chemins à surveiller en mode dev
 */

module.exports = {
  entries: [
    { src: 'examples/example1.jsass', dest: 'examples/output.js' }
  ],
  extension: '.jsass',
  watch: ['examples']
};
