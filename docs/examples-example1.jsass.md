**examples/example1.jsass**

- **But :**
  - Exemple d'entrée `.jsass` démontrant l'utilisation d'une variable et d'une boucle `@each`.

- **Contenu :**
  - Définit une variable `$colors: red, blue, green;`.
  - Utilise `@each $color in $colors` pour définir une structure répétée.

- **Exemple de contenu (fichier) :**

```jsass
$colors: red, blue, green;

@each $color in $colors {
  .text-$color {
    color: $color;
  }
}
```

- **Ce que le script produit :**
  - `src/jsass.js` va extraire `$colors` et produire un objet JS comme :

```js
{
  colorRed: { value: 'red' },
  colorBlue: { value: 'blue' },
  colorGreen: { value: 'green' }
}
```

- **Comment lancer :**

```powershell
node src/jsass.js examples/example1.jsass examples/output.js
```

Le fichier `examples/output.js` contiendra alors l'objet généré et pourra être `require`-é dans d'autres modules.

---
