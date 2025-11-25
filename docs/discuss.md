# Discussion : pourquoi `build` / `build-all` existent alors que `src/jsass.js` peut générer seul

Ce document explique la séparation des responsabilités entre le script `src/jsass.js` (génération unique) et les commandes `build` / `build-all` / `dev` du projet.

- **`src/jsass.js` — rôle principal :**
  - Fournit l'outil minimal et autonome pour *générer un seul fichier* `.jsass` en sortie JS.
  - Fonctionne en mode CLI et peut être appelé directement :

```powershell
node src/jsass.js <input.jsass> <output.js>
```

  - Expose aussi `generateJS` comme API (via `module.exports`) pour être réutilisée par d'autres scripts.

- **Pourquoi ajouter `build-all` (script `bin/build-all.js`) ?**
  - Automatisation : quand le projet contient plusieurs fichiers source (ou quand vous publiez un package), on ne veut pas lancer manuellement `src/jsass.js` pour chaque fichier.
  - `build-all` lit la configuration (`jsass.config.js`) et exécute `generateJS` pour chaque paire `{ src, dest }`. C'est utile pour :
    - CI / pipeline de publication (`prepare` exécute `build` avant `npm publish`).
    - Construire tout le jeu d'artefacts du projet à partir d'une seule commande.

- **Pourquoi garder `start` (génération unique) ?**
  - Simplicité pour le développement rapide : lancer la génération d'un seul fichier sans toucher à la config.
  - Conserve la compatibilité avec l'usage historique du projet (test rapide, débogage).

- **Pourquoi un `dev` (watch) séparé ?**
  - Le mode `dev` (ici `bin/watch-build.js`) surveille les dossiers spécifiés dans `jsass.config.js.watch` et relance automatiquement un build complet quand un fichier change.
  - Ce comportement est différent de lancer une seule génération : il reste actif, donne un feedback immédiat, et évite le travail manuel répétitif.

- **Synthèse — séparation des responsabilités :**
  - `src/jsass.js` = outil minimal / API / CLI pour *un* fichier.
  - `build-all` = orchestration basée sur une configuration (plusieurs entrées, utile pour publication et CI).
  - `dev` = surveillance + rebuild automatique (workflow de développement).

- **Avantages de cette organisation :**
  - Modularité : la logique de parsing est centralisée dans `src/jsass.js` et réutilisable.
  - Flexibilité : vous pouvez appeler `generateJS` depuis d'autres scripts, intégrer dans des builds plus complexes, ou ajouter plugins.
  - Préparation à l'échelle : quand le projet grandit (plus de fichiers, plus d'options), la configuration centralisée et les scripts d'orchestration évitent la duplication.

- **Cas d'usage concret :**
  - Vous avez plusieurs composants chacun avec un `.jsass` → listez-les dans `jsass.config.js.entries` et lancez `npm run build` pour tout générer.
  - Vous développez un composant → lancez `npm run dev` et éditez le `.jsass`, la sortie sera régénérée automatiquement.

---

Si vous préférez une approche différente (par exemple : découverte automatique des fichiers par extension, compilation incrémentale plus fine, ou intégration avec une task runner spécifique), je peux l'implémenter — dites-moi quelle option vous intéresse.
