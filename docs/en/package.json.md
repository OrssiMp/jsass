**package.json**

- **Purpose:**
  - Contains project metadata and useful scripts to run the generator.

- **Key points:**
  - **`main`**: points to `src/jsass.js` (script entry point).
  - **`scripts.start`**: runs `node src/jsass.js examples/example1.jsass examples/output.js`.
  - **`dependencies`**: empty for this prototype (no external dependencies).

- **How to recreate / commands:**
  - Install dependencies (if any):

```powershell
npm install
```

  - Run the generator (start script):

```powershell
npm run start
# or explicitly
node src/jsass.js examples/example1.jsass examples/output.js
```

These commands execute the main script `src/jsass.js` which reads a `.jsass` and generates `examples/output.js`.

---
