import fs from 'fs';
import path from 'path';


export function parseAllureResults(): Set<Object> {
    const dir = 'allure-results';
    const files = fs.readdirSync(dir);
    const set = new Set<any>();

    const resultFiles = files
        .filter(name => /^[a-f0-9-]+-result\.json$/.test(name))
        .map(name => path.join(dir, name));
        
    resultFiles.forEach(jsonFile => {
        const raw = fs.readFileSync(jsonFile, 'utf-8');
        const json = JSON.parse(raw);
        set.add({
            name: json.name,
            url: process.env.BASE_URL,
            status: json.status,
            reason: json.statusDetails?.message || '',
        });
    });
    return set;
}
