const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const files = [
  'tweaks-panel.jsx',
  'data.jsx',
  'components.jsx',
  'sections-a.jsx',
  'sections-b.jsx',
  'sections-c.jsx',
  'app.jsx'
].map(f => path.join(__dirname, 'public', f));

try {
  console.log('📦 Concatenating JSX files...');
  let concatenated = files.map(f => {
    return `// --- FILE: ${path.basename(f)} ---\n` + fs.readFileSync(f, 'utf8');
  }).join('\n\n');

  console.log('⚙️ Compiling with Babel...');
  const result = babel.transformSync(concatenated, {
    presets: ['@babel/preset-react'],
    filename: 'app.jsx',
    compact: true,
    minified: true
  });

  const outputPath = path.join(__dirname, 'public', 'app.bundle.js');
  fs.writeFileSync(outputPath, result.code, 'utf8');
  console.log(`✅ Compilation successful! Saved to ${outputPath} (${result.code.length} bytes)`);
} catch (err) {
  console.error('❌ Build compilation failed:', err);
  process.exit(1);
}
