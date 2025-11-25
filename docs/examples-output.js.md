**examples/output.js**

- **But :**
  - Fichier généré automatiquement par `src/jsass.js`. Contient un objet JS exporté (`module.exports = classes;`).

- **Note :**
  - Ne modifiez pas manuellement ce fichier si vous voulez qu'il soit reproductible ; régénérez-le en lançant le script.

- **Exemple de contenu attendu après génération :**

```js
const classes = {
  colorRed: { value: 'red' },
  colorBlue: { value: 'blue' },
  colorGreen: { value: 'green' }
};
module.exports = classes;
```

- **Comment regénérer :**

```powershell
node src/jsass.js examples/example1.jsass examples/output.js
```

Ensuite, vous pouvez importer `examples/output.js` dans un autre module :

```js
const classes = require('./examples/output.js');
console.log(classes.colorRed.value); // 'red'
```

---
