const { execSync } = require('child_process');
const assert = require('assert');
const path = require('path');
const fs = require('fs');

const projectRoot = path.join(__dirname, '..');
const input = path.join(projectRoot, 'examples', 'example1.jsass');
const output = path.join(projectRoot, 'examples', 'output.js');

try {
  // Run generator
  execSync(`node src/jsass.js "${input}" "${output}"`, { stdio: 'inherit' });
} catch (err) {
  console.error('Generator execution failed');
  process.exit(1);
}

if (!fs.existsSync(output)) {
  console.error('Output file not created:', output);
  process.exit(1);
}

// require the generated file and check keys
const classes = require(output);
const expected = ['colorRed', 'colorBlue', 'colorGreen'];
try {
  expected.forEach(k => {
    assert.ok(classes[k], `Missing expected key: ${k}`);
  });
  console.log('Test passed: all expected keys are present');
  process.exit(0);
} catch (err) {
  console.error('Test failed:', err.message);
  process.exit(1);
}
