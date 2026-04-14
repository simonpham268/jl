/**
 * Build form data from request object, filtering out undefined/null values
 * @param data - The request data object
 * @param requiredFields - Array of required field names (will throw if missing)
 * @returns Form object ready for API submission
 */
export function buildFormData<T extends object>(
  data: T,
  requiredFields: (keyof T)[] = []
): Record<string, string | number | boolean> {
  const form: Record<string, string | number | boolean> = {};

  // Validate required fields
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      throw new Error(`Required field "${String(field)}" is missing`);
    }
  }

  // Add all defined fields to form
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== '') {
      form[key] = value as string | number | boolean;
    }
  }

  return form;
}

/**
 * Build form data with field mapping (when API field names differ from request object)
 * @param data - The request data object
 * @param fieldMapping - Map of data field names to API field names
 * @param requiredFields - Array of required field names
 */
export function buildFormDataWithMapping<T extends object>(
  data: T,
  fieldMapping: Partial<Record<keyof T, string>>,
  requiredFields: (keyof T)[] = []
): Record<string, string | number | boolean> {
  const form: Record<string, string | number | boolean> = {};

  // Validate required fields
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      throw new Error(`Required field "${String(field)}" is missing`);
    }
  }

  // Add all defined fields to form with optional mapping
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== '') {
      const apiFieldName = fieldMapping[key as keyof T] || key;
      form[apiFieldName] = value as string | number | boolean;
    }
  }

  return form;
}
