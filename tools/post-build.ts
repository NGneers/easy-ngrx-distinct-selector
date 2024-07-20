import fs from 'fs';

fs.writeFileSync(
  './dist/cjs/package.json',
  `{
  "type": "commonjs"
}`
);

// Copy package.json to dist folder
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
delete packageJson.devDependencies;
delete packageJson.scripts;
delete packageJson.packageManager;
delete packageJson.prettier;
fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));

// Copy other files to dist folder
fs.copyFileSync('./README.md', './dist/README.md');
fs.copyFileSync('./LICENSE', './dist/LICENSE');
