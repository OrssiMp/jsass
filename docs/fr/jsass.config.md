**jsass.config.js**

- **But :**
  - Permet de configurer les sources à builder, l'extension des fichiers et les répertoires à surveiller en mode `dev`.

- **Exemple par défaut (fichier `jsass.config.js`) :**

```js
module.exports = {
  entries: [
    { src: 'examples/example1.jsass', dest: 'examples/output.js' }
  ],
  extension: '.jsass',
  watch: ['examples']
};
```

- **Champs :**
  - `entries` : tableau d'objets `{ src, dest }` définissant les fichiers d'entrée et de sortie.
  - `extension` : extension des fichiers source (par défaut `.jsass`).
  - `watch` : liste de dossiers/fichiers surveillés par la commande `dev`.

- **Commandes utiles :**

```powershell
# Build une fois (lit jsass.config.js)
npm run build

# Mode dev (rebuild automatique lors des changements)
npm run dev
```

---
