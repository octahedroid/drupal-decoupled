const fs = require('fs');
const path = require('path');

// Storybook components directory
const componentsDir = 'starters/storybook/app/components/ui';
// Remix components directory
const remixDir = 'starters/remix/app/components/ui';
// Next components directory
const nextDir = 'starters/next/components/ui';

function copyComponents(source, target) {
  try {
    fs.rmSync(target, { recursive: true, force: true });
    fs.cpSync(source, target, { recursive: true });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

function modifyComponents() {
  try {
    // Add use client to next components
    const clientComponents = [
      '/Header/Header.tsx',
    ];
    for (const component of clientComponents) {
      const fileName = path.join(nextDir, component);
      const content = fs.readFileSync(fileName, 'utf8');
      fs.writeFileSync(fileName, `'use client'\n\n${content}`);
    }
    // Replace path alias to next components
    const files = fs.readdirSync(nextDir, { withFileTypes: true, recursive: true, encoding: 'utf8' });
    for (const file of files) {
      if (file.isDirectory()) {
        continue;
      }
      if (!file.name.endsWith('.tsx')) {
        continue;
      }
      const fileName = path.join(file.parentPath, file.name);
      const content = fs.readFileSync(fileName, 'utf8');
      fs.writeFileSync(fileName, content.replaceAll('~/', '@/'));
    }
  }
  catch (error) {
    console.error('An error occurred:', error);
  }
}

console.log('Copying remix components...');
copyComponents(componentsDir, remixDir)
console.log('Copying next components...');
copyComponents(componentsDir, nextDir)
console.log('Modifying next components...');
modifyComponents();
