import { createAliveDailySheet, createSheet } from "./utils/googleUtils";
import { parseAllureResults } from "./utils/reportUtils";

export default async function globalTeardown() {
    const data = parseAllureResults();
    const spreadSheetId = await createAliveDailySheet(process.env.BRAND || 'donga');
    await createSheet(spreadSheetId, data)
}