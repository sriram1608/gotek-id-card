import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filepath: string) => void) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const targetString = "const isDark = ['premium-tech', 'smart-digital', 'dark-mode'].includes(theme);";
const replacementString = "const isDark = theme === 'dark';";

let modifiedCount = 0;

walkDir('./src', (filepath) => {
    if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
        const originalContent = fs.readFileSync(filepath, 'utf-8');
        if (originalContent.includes(targetString)) {
            const newContent = originalContent.replace(
                new RegExp(targetString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                replacementString
            );
            fs.writeFileSync(filepath, newContent, 'utf-8');
            console.log(`Updated: ${filepath}`);
            modifiedCount++;
        }
    }
});

console.log(`\nFinished! Modified ${modifiedCount} files.`);
