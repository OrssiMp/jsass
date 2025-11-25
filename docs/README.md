Voir les dossiers `fr/` et `en/` pour la documentation en français et en anglais.

# Jsass Prototype

## Description
Jsass est un prototype inspiré de Sass, mais pour JavaScript. Il permet de générer des **objets et tableaux JS** à partir d'une syntaxe proche de Sass avec `$variables`, `@each`, `@for`, et `@if` (prototype minimal pour l'instant).

## Installation
1. Installer Node.js si ce n'est pas déjà fait.
2. Cloner ou télécharger le projet.
3. Exécuter :
```bash
npm install
node src/jsass.js examples/example1.jsass examples/output.js
```

## Syntaxe

### Variables
```jsass
$colors: red, blue, green;
```

### Boucle @each
```jsass
@each $color in $colors {
  .text-$color {
    color: $color;
  }
}
```

### Génération JS
Le fichier généré `output.js` ressemblera à :
```js
const classes = {
  colorRed: { value: 'red' },
  colorBlue: { value: 'blue' },
  colorGreen: { value: 'green' }
};
module.exports = classes;
```

## Exercices simples
1. Ajouter une nouvelle variable `$sizes: 1, 2, 3;` et générer des classes `p-1`, `p-2`, `p-3`.
2. Créer un fichier `.jsass` avec une variable `$fruits: apple, banana;` et générer un objet JS avec chaque fruit.

## Exemple de projet collaboratif
- Chaque développeur peut créer son propre fichier `.jsass` pour un module ou un composant.
- Au merge, tous les fichiers `.jsass` sont compilés en objets JS dans un même projet.

## Correction et debug

Voici ce que j'ai corrigé et comment vous pouvez comprendre et reproduire la résolution :

- **Problème observé :** le script lançait une erreur lorsque le parser essayait d'itérer sur une variable inexistante (TypeError: Cannot read property 'forEach' of undefined). Cela venait d'une incohérence entre la façon dont les variables étaient stockées et la façon dont elles étaient recherchées.

- **Cause racine :** les variables étaient stockées avec le signe `$` dans la clé (par exemple `"$colors"`) alors que le parsing de `@each` cherchait la clé sans `$` (par exemple `"colors"`). De plus, il n'y avait pas de vérification pour s'assurer que la variable existait et était bien un tableau avant d'appeler `forEach`.

- **Fichiers modifiés :**
  - `src/jsass.js`

- **Modifications principales :**
  - Normaliser le nom des variables lors de l'analyse : on retire le préfixe `$` avant d'enregistrer la variable.
  - Ignorer les lignes mal formées (ligne sans `:`) lors du parse de variables.
  - Vérifier que la variable passée à `@each` existe et est un tableau (`Array.isArray`) avant d'appeler `forEach`.
  - Amélioration de la regex pour parser proprement `@each`.

- **Extrait des fonctions corrigées (simplifié) :**

```javascript
// parseVariables: enlève le $ et découpe les valeurs
const parts = line.split(':');
if(parts.length < 2) return;
const name = parts[0].trim().replace(/^\$/,'');
const values = parts.slice(1).join(':').replace(';','').split(',').map(v => v.trim());
variables[name] = values;

// parseEach: vérifie que la variable existe et est un tableau
const regex = /@each\s+\$(\w+)\s+in\s+\$(\w+)/;
const match = line.match(regex);
if(match) {
  const [, varName, arrayName] = match;
  const arr = variables[arrayName];
  if(Array.isArray(arr)) {
    arr.forEach(val => { /* ... */ });
  }
}
```

- **Comment vérifier localement :**

Ouvrez une console PowerShell dans le dossier du projet et lancez :

```powershell
npm run start
# ou explicitement
node src/jsass.js examples/example1.jsass examples/output.js
```

Vous devriez voir la ligne `JS généré dans examples/output.js` et le fichier `examples/output.js` contiendra l'objet JS généré.

- **Si une erreur apparaît encore :** copiez-collez ici le message d'erreur complet (stdout/stderr). Je l'analyserai et corrigerai la suite.

---
