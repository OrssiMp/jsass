#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const configPath = path.join(process.cwd(), 'jsass.config.js');
if(!fs.existsSync(configPath)){
  console.error('Missing jsass.config.js in project root');
  process.exit(1);
}

const config = require(configPath);
const { generateJS } = require(path.join(process.cwd(), 'src', 'jsass.js'));

(async () => {
  try {
    for(const entry of (config.entries || [])){
      const src = entry.src;
      const dest = entry.dest;
      console.log('Building', src, '->', dest);
      generateJS(src, dest);
    }
    console.log('All entries built');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
})();
