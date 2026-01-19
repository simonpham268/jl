import fs from 'fs';

export default async function globalSetup() {
    const folders = ['allure-results', 'allure-report','storage'];

    for (const folder of folders) {
        if (fs.existsSync(folder)) {
            fs.rmSync(folder, { recursive: true, force: true });
        }
    }
}