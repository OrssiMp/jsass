# jsass -En développement...
Prototype de Jsass inspiré de Sass pour JS, pour faciliter la définitions des objets, tableaux  js sans avoir à écrire beaucoup de code facilitant ainsi le développement  et offrant plus de temps
# Jsass — Prototype léger de génération JS depuis une syntaxe «à la Sass»

Un prototype minimal qui permet de définir des variables et des boucles dans des fichiers `.jsass` et de générer des objets JavaScript exportables.

Ce dépôt contient :
- `src/jsass.js` — parser & générateur : lit un fichier `.jsass` et écrit un fichier JS exportant un objet.
- `jsass.config.js` — configuration des entrées à builder, extension et chemins à surveiller.
- `bin/build-all.js` — orchestre la génération pour toutes les entrées listées dans `jsass.config.js`.
- `bin/watch-build.js` — mode `dev` : watch + rebuild automatique (utilise `chokidar`).
- `examples/` — exemple d'entrée (`example1.jsass`) et fichier généré (`output.js`).
- `docs/` — documentation en français et anglais.

---

**État** : prototype. Utilisé pour démonstration et expérimentation (parse minimal : variables et `@each`).

**Licence** : MIT

---

## Installation

Ouvrez PowerShell dans la racine du projet :

```powershell
npm install
```

Cela installera les dépendances de développement (par ex. `chokidar` pour le mode `dev`).

## Scripts utiles (dans `package.json`)

- `npm run start` : exécute `src/jsass.js` en mode CLI pour un seul fichier (par défaut `examples/example1.jsass -> examples/output.js`).
- `npm run build` : exécute `bin/build-all.js` — construit toutes les entrées listées dans `jsass.config.js`.
- `npm run dev` : exécute `bin/watch-build.js` — watch des chemins listés dans `jsass.config.js.watch` et rebuild automatique.
- `npm run test-generate` : script de vérification d'exemple (vérifie que les clés attendues sont présentes dans `examples/output.js`).

Exécuter un script :

```powershell
npm run build
npm run dev
npm run start
```

---

## Comment ça marche (en bref)

- `src/jsass.js` expose une fonction `generateJS(inputPath, outputPath)` :
  - lit le `.jsass`, parse les variables `$name: v1, v2;` (stockées sans le `$`) et les directives `@each $x in $array` pour générer des clés dynamiques.
  - écrit un fichier JS ressemblant à :

```js
const classes = { colorRed: { value: 'red' }, ... };
module.exports = classes;
```

- `bin/build-all.js` importe `jsass.config.js` et appelle `generateJS` pour chaque `entries` (paires `{ src, dest }`). Utile pour CI/publication.
- `bin/watch-build.js` effectue un build initial puis surveille les changements (via `chokidar`) et relance un build à chaque modification.

---

## Configuration

Fichier `jsass.config.js` (exemple minimal déjà présent) :

```js
module.exports = {
  entries: [
    { src: 'examples/example1.jsass', dest: 'examples/output.js' }
  ],
  extension: '.jsass',
  watch: ['examples']
};
```

- `entries` : liste des fichiers à générer (input → output).
- `extension` : extension des fichiers source (par défaut `.jsass`).
- `watch` : chemins surveillés par `npm run dev`.

Si vous préférez la découverte automatique (glob) plutôt que lister `entries`, je peux ajouter cette fonctionnalité.

---

## Exemple d'utilisation

Générer un fichier unique :

```powershell
node src/jsass.js examples/example1.jsass examples/output.js
```

Générer toutes les entrées définies dans la config :

```powershell
npm run build
```

Mode développement (rebuild automatique) :

```powershell
npm run dev
```

Vérifier l'exemple automatiquement :

```powershell
npm run test-generate
```

---

## Publication sur npm — étapes recommandées

1. Mettez à jour `package.json` :
   - vérifiez le champ `name` (doit être unique sur npm), `version`, `description`, `repository`, `author`, `license`.
2. Testez localement :

```powershell
npm run build
npm pack --dry-run
```

3. (optionnel) Connectez-vous à npm :

```powershell
npm login
```

4. Publiez :

```powershell
npm publish
# si package scoped and public: npm publish --access public
```

Remarque : le script `prepare` dans `package.json` exécute `npm run build` automatiquement avant la publication.

---

## .npmignore

Le dépôt contient un `.npmignore` qui exclut la plupart des fichiers MD internes pour alléger le package publié, tout en conservant :
- `README.md` racine
- `docs/fr/README.md` et `docs/en/README.md`
- `jsass.config.js`

Vous pouvez ajuster `.npmignore` si vous souhaitez inclure/exclure d'autres fichiers (tests, exemples, etc.).

---

## Contribution

Contributions bienvenues : issues, PRs, suggestions. Pour des changements importants (nouvelle syntaxe, plugin system), ouvrez d'abord une issue pour discussion.

Style guide :
- Préservez les tests et la compatibilité du CLI.
- Ajoutez des docs FR/EN dans `docs/` si vous introduisez des options utilisateurs.

---

## Roadmap (idées)

- Supporter `@for` / `@if` / blocs imbriqués.
- Découverte automatique des sources par extension (glob patterns).
- Système de plugins/transforms pour modifier la sortie.
- CLI plus riche (options `--watch`, `--config`, `--out-dir`).

---
- ajouter des tests unitaires pour le parser.

