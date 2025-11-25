**jsass.config.js**

- **Purpose:**
  - Configure source entries to build, source file extension and watch paths for `dev` mode.

- **Default example (`jsass.config.js`):**

```js
module.exports = {
  entries: [
    { src: 'examples/example1.jsass', dest: 'examples/output.js' }
  ],
  extension: '.jsass',
  watch: ['examples']
};
```

- **Fields:**
  - `entries`: array of `{ src, dest }` objects defining input and output files.
  - `extension`: source file extension (default `.jsass`).
  - `watch`: array of paths to watch for `dev` command.

- **Useful commands:**

```powershell
# Build once (reads jsass.config.js)
npm run build

# Dev mode (auto rebuild on changes)
npm run dev
```

---
