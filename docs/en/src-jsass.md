**src/jsass.js**

- **Purpose:**
  - Parse a minimal `.jsass` file and generate a JS file (`output.js`) that exports an object.

- **Main functions and structure:**
  - **`parseVariables(lines)`**:
    - Reads lines and extracts variables in the form `$name: val1, val2;`.
    - Normalizes the variable name by removing the `$` when storing the key.
    - Returns an object like `{ name: ["val1","val2"] }`.

  - **`parseEach(lines, variables)`**:
    - Scans lines for `@each $x in $array` statements.
    - For each value in the array variable, creates a dynamic key and a simple object `{ value: val }`.
    - Verifies the variable exists and is an array (`Array.isArray`) before iterating.

  - **`generateJS(filePath, outputPath)`**:
    - Reads the `.jsass` file, extracts variables and objects, builds a JS string and writes `outputPath`.
    - Produces:

```js
const classes = { ... };
module.exports = classes;
```

  - **`if(require.main === module)`** block allows calling the script from CLI with `input` and `output` arguments.

- **Bug fixed earlier:**
  - Normalized variable names (removed `$`) to avoid calling `forEach` on `undefined`.
  - Added handling for malformed lines and array checks.

- **Usage / how to recreate:**

```powershell
node src/jsass.js examples/example1.jsass examples/output.js
```

The file `examples/output.js` will be created (or overwritten) and will contain the exported JS object.

---
