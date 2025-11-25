
// ==== jsass.js ==== //
// Prototype minimal de Jsass
// Il permet de parser un fichier .jsass et de générer un objet JS ou tableau.

const fs = require('fs');

// Fonction pour parser des variables
function parseVariables(lines) {
    const variables = {};
    lines.forEach(line => {
        line = line.trim();
        if(line.startsWith('$')) {
            // Format : $var: val1, val2, val3;
            const parts = line.split(':');
            if(parts.length < 2) return;
            const namePart = parts[0].trim();
            const valuesPart = parts.slice(1).join(':').replace(';','');
            const name = namePart.replace(/^\$/,'');
            variables[name] = valuesPart.split(',').map(v => v.trim());
        }
    });
    return variables;
}

// Fonction pour parser @each
function parseEach(lines, variables) {
    const result = {};

    lines.forEach(line => {
        line = line.trim();
        if(line.startsWith('@each')) {
            // Format : @each $x in $array {
            const regex = /@each\s+\$(\w+)\s+in\s+\$(\w+)/;
            const match = line.match(regex);
            if(match) {
                const [, varName, arrayName] = match;
                const arr = variables[arrayName];
                if(Array.isArray(arr)) {
                    arr.forEach(val => {
                        const key = varName + val.charAt(0).toUpperCase() + val.slice(1);
                        result[key] = { value: val };
                    });
                }
            }
        }
    });

    return result;
}

// Fonction principale pour générer JS à partir d'un fichier .jsass
function generateJS(filePath, outputPath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const variables = parseVariables(lines);
    const objects = parseEach(lines, variables);

    const output = 'const classes = ' + JSON.stringify(objects, null, 2) + ';\nmodule.exports = classes;';
    fs.writeFileSync(outputPath, output);
    console.log('JS généré dans', outputPath);
}

// Exemple d'utilisation
if(require.main === module){
    const input = process.argv[2] || './examples/example1.jsass';
    const output = process.argv[3] || './examples/output.js';
    generateJS(input, output);
}

// Exporter la fonction pour être réutilisée par des scripts de build
module.exports = { generateJS };
