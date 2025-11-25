**package.json**

- **But :**
  - Contient les métadonnées du projet et les scripts utiles pour lancer la compilation.

- **Points clés :**
  - **`main`** : pointe vers `src/jsass.js` (point d'entrée du script).
  - **`scripts.start`** : exécute `node src/jsass.js examples/example1.jsass examples/output.js`.
  - **`dependencies`** : vide pour ce prototype (pas de dépendances externes).

- **Comment recréer / commandes :**
  - Installer les dépendances (s'il y en a) :

```powershell
npm install
```

  - Lancer la génération (script `start`) :

```powershell
npm run start
# ou explicitement
node src/jsass.js examples/example1.jsass examples/output.js
```

Ces commandes exécutent le fichier principal `src/jsass.js` qui lit un `.jsass` et génère `examples/output.js`.

---
