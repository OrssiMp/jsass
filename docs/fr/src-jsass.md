**src/jsass.js**

- **But :**
  - Parser un fichier `.jsass` minimaliste et générer un fichier JS (`output.js`) contenant un objet exporté.

- **Structure et fonctions principales :**
  - **`parseVariables(lines)`** :
    - Parcourt les lignes et extrait les variables au format `$name: val1, val2;`.
    - Normalise le nom de variable en retirant le `$` pour stocker la clé (`name`).
    - Retourne un objet `{ name: ["val1","val2"] }`.

  - **`parseEach(lines, variables)`** :
    - Parcourt les lignes à la recherche de `@each $x in $array`.
    - Pour chaque valeur de la variable tableau trouvée, génère une clé dynamique et un objet minimal `{ value: val }`.
    - Vérifie que la variable existe et est un tableau (`Array.isArray`) avant d'itérer.

  - **`generateJS(filePath, outputPath)`** :
    - Lit le fichier `.jsass`, obtient les variables et objets, construit une chaîne JS et écrit `outputPath`.
    - Produit :

```js
const classes = { ... };
module.exports = classes;
```

  - **Bloc `if(require.main === module)`** : permet d'appeler le script depuis la ligne de commande en fournissant `input` et `output`.

- **Bug corrigé précédemment :**
  - Normalisation des noms de variables (suppression du `$`) afin d'éviter d'essayer d'appeler `forEach` sur `undefined`.
  - Gestion des lignes mal formées et vérification de la présence d'un tableau.

- **Usage / comment recréer :**

```powershell
node src/jsass.js examples/example1.jsass examples/output.js
```

Le fichier `examples/output.js` sera créé (ou écrasé) et contiendra l'objet JS exporté.

---
