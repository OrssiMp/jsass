**examples/example1.jsass**

- **Purpose:**
  - Sample `.jsass` input demonstrating a variable and an `@each` loop.

- **Content:**
  - Defines a variable `$colors: red, blue, green;`.
  - Uses `@each $color in $colors` to create repeated structures.

- **Example file content:**

```jsass
$colors: red, blue, green;

@each $color in $colors {
  .text-$color {
    color: $color;
  }
}
```

- **What the script produces:**
  - `src/jsass.js` will extract `$colors` and produce a JS object like:

```js
{
  colorRed: { value: 'red' },
  colorBlue: { value: 'blue' },
  colorGreen: { value: 'green' }
}
```

- **How to run:**

```powershell
node src/jsass.js examples/example1.jsass examples/output.js
```

The file `examples/output.js` will then contain the generated object and can be `require`d by other modules.

---
