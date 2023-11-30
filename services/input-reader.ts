import * as fs from 'fs';
import * as path from 'path';

const inputsPath = path.join(__dirname, '../inputs');
const samplesPath = path.join(inputsPath, `/samples`);
const mainModuleName = path.basename(require.main!.filename, '.ts');

export class InputReader {

    readInput(lines: boolean = true): Promise<string | string[]> {
        return this.readFile(path.join(inputsPath, `${mainModuleName}.txt`), lines);
    }

    readSampleInput(lines: boolean = true): Promise<string | string[]> {
        return this.readFile(path.join(samplesPath, `${mainModuleName}.txt`), lines);
    }

    private readFile(filePath: string, lines: boolean): Promise<string | string[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err)
                    return reject(err);
                
                data = data.trim();
                return resolve(lines ? data.split('\r\n') : data);
            });
        })
    }
}
