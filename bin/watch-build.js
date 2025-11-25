#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
let chokidar;
try { chokidar = require('chokidar'); } catch (e) {
  console.error('Please install dev dependency "chokidar" to use the dev watcher: npm i -D chokidar');
  process.exit(1);
}

const configPath = path.join(process.cwd(), 'jsass.config.js');
if(!fs.existsSync(configPath)){
  console.error('Missing jsass.config.js in project root');
  process.exit(1);
}
const config = require(configPath);
const { generateJS } = require(path.join(process.cwd(), 'src', 'jsass.js'));

function buildAll(){
  (config.entries || []).forEach(entry => {
    try {
      console.log('Building', entry.src, '->', entry.dest);
      generateJS(entry.src, entry.dest);
    } catch(err) {
      console.error('Build error for', entry.src, err.message);
    }
  });
}

buildAll();

const watchPaths = config.watch || ['examples'];
console.log('Watching', watchPaths.join(', '), 'for changes...');
const watcher = chokidar.watch(watchPaths, { ignoreInitial: true });
let running = false;
watcher.on('all', (event, path) => {
  if(running) return;
  running = true;
  console.log('Change detected:', event, path);
  try { buildAll(); } finally { setTimeout(()=> running = false, 100); }
});
