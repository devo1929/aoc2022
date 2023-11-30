import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';

const packageFile = path.join(__dirname, '../', 'package.json');

fs.readFile(packageFile, 'utf-8', (err, data) => {
    if (err)
        throw err;

    console.log('Executing all days');
    const _package = JSON.parse(data);
    Object.keys(_package.scripts).forEach(script => {
        if (!script.startsWith('day'))
            return;

        child_process.exec(`npm run ${script}`, (err, stdout) => {
            console.log(stdout);
        })
    })
});
