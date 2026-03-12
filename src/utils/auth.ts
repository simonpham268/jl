import fs from 'fs';
import path from 'path';

export interface AuthData {
  cookies: any[];
  __requestverificationtoken: string;
}

export interface MultiAuthData {
  main: AuthData | null;
  sub: AuthData | null;
}

const AUTH_DIR = path.join(__dirname, '../../.auth');
const AUTH_FILE = path.join(AUTH_DIR, 'auth.json');

export function ensureAuthDir() {
  if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
  }
}

/**
 * Save auth data for a specific contractor type (main or sub)
 */
export function saveAuthData(authData: AuthData, type: 'main' | 'sub' = 'main') {
  ensureAuthDir();
  
  // Load existing auth data
  let allAuthData: MultiAuthData = { main: null, sub: null };
  if (fs.existsSync(AUTH_FILE)) {
    try {
      allAuthData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    } catch (error) {
      console.warn('Could not load existing auth data, starting fresh');
    }
  }
  
  // Update the specific type
  allAuthData[type] = authData;
  
  // Save back to file
  fs.writeFileSync(AUTH_FILE, JSON.stringify(allAuthData, null, 2));
  console.log(`Auth data for ${type} saved`);
}

/**
 * Load auth data for a specific contractor type
 */
export function loadAuthData(type: 'main' | 'sub' = 'main'): AuthData | null {
  if (!fs.existsSync(AUTH_FILE)) {
    console.warn(`Auth file not found:`, AUTH_FILE);
    return null;
  }

  try {
    const allAuthData: MultiAuthData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
    const authData = allAuthData[type];
    
    if (!authData) {
      console.warn(`No auth data found for ${type}`);
      return null;
    }
    
    return authData;
  } catch (error) {
    console.error(`Failed to load auth data for ${type}:`, error);
    return null;
  }
}

/**
 * Load all auth data (both main and sub)
 */
export function loadAllAuthData(): MultiAuthData | null {
  if (!fs.existsSync(AUTH_FILE)) {
    console.warn('Auth file not found:', AUTH_FILE);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
  } catch (error) {
    console.error('Failed to load auth data:', error);
    return null;
  }
}

/**
 * Clear auth data for a specific type or all
 */
export function clearAuthData(type?: 'main' | 'sub') {
  if (!fs.existsSync(AUTH_FILE)) {
    return;
  }
  
  if (!type) {
    // Clear all
    fs.unlinkSync(AUTH_FILE);
    console.log('All auth data cleared');
  } else {
    // Clear specific type
    try {
      const allAuthData: MultiAuthData = JSON.parse(fs.readFileSync(AUTH_FILE, 'utf-8'));
      allAuthData[type] = null;
      fs.writeFileSync(AUTH_FILE, JSON.stringify(allAuthData, null, 2));
      console.log(`Auth data for ${type} cleared`);
    } catch (error) {
      console.error(`Failed to clear auth data for ${type}:`, error);
    }
  }
}
