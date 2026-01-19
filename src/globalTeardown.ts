import { createTestSheet, createSheet } from "./utils/googleUtils";
import { parseAllureResults } from "./utils/reportUtils";

export default async function globalTeardown() {
    const data = parseAllureResults();
    const spreadSheetId = await createTestSheet(process.env.BRAND || 'default');
    await createSheet(spreadSheetId, data)
}