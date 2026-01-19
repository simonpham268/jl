import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const jsonPath = path.join(__dirname, '../google/googleapis-services.json');
const rootFolderId = '1CZmr9HJefmYbaNN1KoYwDG316OMCEwlw';

const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(
        fs.readFileSync(jsonPath, 'utf8')
    ),
    scopes: ['https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
    ],
});

const drive = google.drive({ version: 'v3', auth });
const sheets = google.sheets({ version: 'v4', auth });

async function getOrCreateFolder(name: string, parentId?: string) {
    const q = [
        `name='${name}'`,
        `mimeType='application/vnd.google-apps.folder'`,
        'trashed=false',
        parentId ? `'${parentId}' in parents` : null,
    ].filter(Boolean).join(' and ');

    const res = await drive.files.list({
        q,
        fields: 'files(id, name)',
    });

    if (res.data.files?.length) {
        return res.data.files[0].id!;
    }

    const folder = await drive.files.create({
        requestBody: {
            name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: parentId ? [parentId] : [],
        },
        fields: 'id',
    });

    return folder.data.id!;
}

async function createSpreadsheet(title: string) {
    const res = await sheets.spreadsheets.create({
        requestBody: {
            properties: { title },
        },
    });
    return res.data.spreadsheetId!;
}

async function moveFileToFolder(fileId: string, folderId: string) {
    const file = await drive.files.get({
        fileId,
        fields: 'parents',
    });

    await drive.files.update({
        fileId,
        addParents: folderId,
        removeParents: file.data.parents?.join(','),
    });
}

export async function createSheet(spreadsheetId: string, data: Set<Object>) {
    const header = ['Name', 'URL', 'Status', 'Reason'];
    const rows = Array.from(data).map((item: any) => [
        item.name,
        item.url,
        item.status,
        item.reason,
    ]);
    const values = [header, ...rows];

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        requestBody: {
            values
        },
    });
}

/**
 * Create Alive Daily Sheet in Google Drive
 * @param domain 
 * @param date 
 * @returns 
 */
export async function createAliveDailySheet(
    domain: string,
    date = new Date()
) {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const monthFormat = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = year;

    const rootFolder = await getOrCreateFolder('DONTCLICK', rootFolderId);
    const bingbongFolder = await getOrCreateFolder(domain, rootFolder);
    const monthFolder = await getOrCreateFolder(`${monthFormat}-${year}`, bingbongFolder);

    const fileName = `${domain}_Alive_Daily_${dd}-${mm}-${yyyy}`;

    const sheetId = await createSpreadsheet(fileName);
    await moveFileToFolder(sheetId, monthFolder);
    return sheetId;
}



