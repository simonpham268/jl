
import * as fs from 'fs';
import * as path from 'path';

/**
 * Get locator string from JSON file based on section and name.
 * @param section1 
 * @param section2 
 * @param name 
 * @param domain 
 * @returns 
 */
export const getStringLocator = (section1: string, section2: string, name: string, domain: string = process.env.BRAND || ""): string => {
  let fileName = `../locators/${domain.toLowerCase()}locators.json`;
  const filePath = path.join(__dirname, fileName);
  const locators: any = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return locators?.[section1]?.[section2]?.[name] || '';
}

