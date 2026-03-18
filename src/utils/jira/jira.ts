// JIRA API Integration
const fetch = require('node-fetch');
const ExcelJS = require('exceljs');

// JIRA Configuration
const JIRA_CONFIG = {
    baseUrl: 'https://joblogic.atlassian.net',
    auth: 'dmllbnBAam9ibG9naWMuY29tOkFUQVRUM3hGZkdGMEtFbXc2bklCOWIxNVRmcFZQM1lxWlhPeGFLWU5kSHlOaU5ncElydTJNYnowZ2N0NF9md0ZVZ3dlWFRMQkpldDljaXdmS0F5ZDh4dWpwRXZucm8yTHdBUW1lNjZzcTE5U0dmQ0tfSXJKc3dlWjF4ckk1WmFqQ1Q1TTUyVnVHeXVFMnFmWGwtcUktM2hieEw3aDA0YXFSREZtUEt0NXRBYWhucGszU2tTUDJDbz0yQzhCMDcxMQ==',
    xsrfToken: 'b7fd80920ccc4cf19f8bdbd1f5789385c341ebfe_lin'
};

// JIRA Issue Interface
interface JiraIssue {
    key: string;
    id: string;
    fields: {
        summary: string;
        labels: string[];
        components: Array<{
            id: string;
            name: string;
        }>;
        fixVersions: Array<{
            id: string;
            name: string;
        }>;
        priority?: {
            name: string;
            id: string;
        };
        assignee?: {
            displayName: string;
            emailAddress: string;
        };
        status: {
            name: string;
            id: string;
        };
        duedate?: string;
        customfield_13018?: {
            self: string;
            value: string;
            id: string;
        } | Array<{
            self: string;
            value: string;
            id: string;
        }>;
        customfield_10723?: {
            value: string;
            id: string;
        };
    };
}

// JIRA Search Response Interface
interface JiraSearchResponse {
    expand: string;
    startAt: number;
    maxResults: number;
    total: number;
    issues: JiraIssue[];
}

/**
 * Get all tickets for a specific release/sprint version
 * @param releaseVersion - Sprint version (e.g., "213")
 * @param maxResults - Maximum number of results to return (default: 100)
 * @returns Promise<JiraIssue[]> - Array of JIRA issues
 */
export async function getTicketsByRelease(
    releaseVersion: string,
    maxResults: number = 100
): Promise<JiraIssue[]> {
    try {
        console.log(`Fetching JIRA tickets for Sprint ${releaseVersion}...`);

        const jqlQuery = `project = JOB AND fixVersion = "Sprint ${releaseVersion}" AND status not in (Closed) AND type not in (Subtask, Sub-task, Epic) AND "Scope Of Work[Select List (multiple choices)]" not in ("Quality Control", "Non-Functional") AND summary !~ Environment AND summary !~ "Deployment Note" AND "Scope Of Work[Select List (multiple choices)]" = "Core Product - Web"`;

        const requestBody = {
            jql: jqlQuery,
            fields: [
                "summary",
                "labels",
                "components",
                "fixVersions",
                "customfield_13018"
            ],
            maxResults: maxResults
        };

        const response = await fetch(`${JIRA_CONFIG.baseUrl}/rest/api/3/search/jql`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${JIRA_CONFIG.auth}`,
                'Cookie': `atlassian.xsrf.token=${JIRA_CONFIG.xsrfToken}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`JIRA API error: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
        }

        const data = await response.json() as JiraSearchResponse;

        console.log(`Found ${data.issues?.length || 0} tickets for Sprint ${releaseVersion}`);
        console.log(`Retrieved ${data.issues.length} tickets (maxResults: ${maxResults})`);

        return data.issues;

    } catch (error: any) {
        console.error(`Failed to fetch tickets for Sprint ${releaseVersion}:`, error?.message || error);
        throw error;
    }
}

/**
 * Get tickets summary for a release
 * @param releaseVersion - Sprint version (e.g., "213")
 * @returns Promise<string[]> - Array of ticket summaries with keys
 */
export async function getTicketsSummaryByRelease(releaseVersion: string): Promise<string[]> {
    try {
        const tickets = await getTicketsByRelease(releaseVersion);

        return tickets.map(ticket => `${ticket.key}: ${ticket.fields.summary}`);

    } catch (error: any) {
        console.error(`Failed to get tickets summary for Sprint ${releaseVersion}:`, error?.message || error);
        return [];
    }
}

/**
 * Get tickets grouped by components for a release
 * @param releaseVersion - Sprint version (e.g., "213")
 * @returns Promise<Record<string, JiraIssue[]>> - Tickets grouped by component
 */
export async function getTicketsByComponent(releaseVersion: string): Promise<Record<string, JiraIssue[]>> {
    try {
        const tickets = await getTicketsByRelease(releaseVersion);
        const groupedTickets: Record<string, JiraIssue[]> = {};

        for (const ticket of tickets) {
            const components = ticket.fields.components.length > 0
                ? ticket.fields.components.map(c => c.name)
                : ['No Component'];

            for (const component of components) {
                if (!groupedTickets[component]) {
                    groupedTickets[component] = [];
                }
                groupedTickets[component].push(ticket);
            }
        }

        return groupedTickets;

    } catch (error: any) {
        console.error(`Failed to get tickets by component for Sprint ${releaseVersion}:`, error?.message || error);
        return {};
    }
}

/**
 * Get detailed ticket information including custom fields
 * @param ticketKey - JIRA ticket key (e.g., "JOB-66542")
 * @returns Promise<JiraIssue> - Detailed ticket information
 */
export async function getTicketDetails(ticketKey: string): Promise<JiraIssue> {
    try {
        console.log(`Fetching details for ticket: ${ticketKey}`);

        const response = await fetch(`${JIRA_CONFIG.baseUrl}/rest/api/3/issue/${ticketKey}?fields=customfield_13018,summary`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${JIRA_CONFIG.auth}`,
                'Cookie': `atlassian.xsrf.token=${JIRA_CONFIG.xsrfToken}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`JIRA API error: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
        }

        const ticket = await response.json() as JiraIssue;
        return ticket;

    } catch (error: any) {
        console.error(`Failed to fetch ticket details for ${ticketKey}:`, error?.message || error);
        throw error;
    }
}

/**
 * Get custom field values (Service Jobs) from tickets for a release
 * @param releaseVersion - Sprint version (e.g., "213")
 * @returns Promise<string[]> - Array of custom field values like ["Service Jobs - SVJB"]
 */
export async function getCustomFieldValuesByRelease(releaseVersion: string): Promise<string[]> {
    try {
        console.log(`Fetching custom field values for Sprint ${releaseVersion}...`);

        const tickets = await getTicketsByRelease(releaseVersion);
        const customFieldValues: string[] = [];

        for (const ticket of tickets) {
            if (ticket.fields.customfield_13018) {
                const customField = ticket.fields.customfield_13018;

                if (Array.isArray(customField)) {
                    for (const item of customField) {
                        if (item.value && !customFieldValues.includes(item.value)) {
                            customFieldValues.push(item.value);
                        }
                    }
                } else if (customField && 'value' in customField && customField.value) {
                    if (!customFieldValues.includes(customField.value)) {
                        customFieldValues.push(customField.value);
                    }
                }
            }
        }

        console.log(`Found ${customFieldValues.length} unique custom field values`);
        return customFieldValues;

    } catch (error: any) {
        console.error(`Failed to get custom field values for Sprint ${releaseVersion}:`, error?.message || error);
        return [];
    }
}

/**
 * Get tickets mapped to their custom field values
 * @param releaseVersion - Sprint version (e.g., "213") 
 * @returns Promise<Record<string, string[]>> - Object mapping custom field values to ticket keys
 */
export async function getTicketsByCustomField(releaseVersion: string): Promise<Record<string, string[]>> {
    try {
        const tickets = await getTicketsByRelease(releaseVersion);
        const mappedTickets: Record<string, string[]> = {};

        for (const ticket of tickets) {
            let customFieldValue = 'No Custom Field';

            if (ticket.fields.customfield_13018) {
                const customField = ticket.fields.customfield_13018;

                if (Array.isArray(customField) && customField.length > 0) {
                    customFieldValue = customField[0].value;
                } else if (customField && 'value' in customField && customField.value) {
                    customFieldValue = customField.value;
                }
            }

            if (!mappedTickets[customFieldValue]) {
                mappedTickets[customFieldValue] = [];
            }

            mappedTickets[customFieldValue].push(ticket.key);
        }

        return mappedTickets;

    } catch (error: any) {
        console.error(`Failed to get tickets by custom field for Sprint ${releaseVersion}:`, error?.message || error);
        return {};
    }
}

/**
 * Get custom field values by fetching detailed ticket information 
 * @param releaseVersion - Sprint version (e.g., "213")
 * @returns Promise<string[]> - Array of custom field values from detailed ticket calls
 */
export async function getCustomFieldValuesFromDetails(releaseVersion: string): Promise<string[]> {
    try {
        // First get all tickets for the release
        const tickets = await getTicketsByRelease(releaseVersion);

        const customFieldValues: string[] = [];

        // Process each ticket to get detailed information
        for (const ticket of tickets) {

            try {
                // Get detailed ticket information
                const detailedTicket = await getTicketDetails(ticket.key);

                // Extract customfield_13018 values
                if (detailedTicket.fields.customfield_13018) {
                    const customField = detailedTicket.fields.customfield_13018;

                    // Handle both single value and array of values
                    if (Array.isArray(customField)) {
                        // If it's an array of objects with value property
                        for (const item of customField) {
                            if (item.value && !customFieldValues.includes(item.value)) {
                                customFieldValues.push(item.value);
                                console.log(`  Found value: "${item.value}"`);
                            }
                        }
                    } else if (customField.value) {
                        // If it's a single object with value property
                        if (!customFieldValues.includes(customField.value)) {
                            customFieldValues.push(customField.value);
                            console.log(`  Found value: "${customField.value}"`);
                        }
                    }
                } else {
                }

                // Add small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error) {
                console.error(`Failed to get details for ${ticket.key}:`, error);
            }
        }

        console.log(`\nUnique custom field values found: ${customFieldValues.length}`);
        customFieldValues.forEach((value, index) => {
            console.log(`${index + 1}. "${value}"`);
        });

        console.log(`\nCustom Field Values Array: ${JSON.stringify(customFieldValues)}`);

        return customFieldValues;

    } catch (error: any) {
        console.error(`Failed to get custom field values from details for Sprint ${releaseVersion}:`, error?.message || error);
        return [];
    }
}

/**
 * Get tickets mapped to their detailed custom field values
 * @param releaseVersion - Sprint version (e.g., "213") 
 * @returns Promise<Record<string, string[]>> - Object mapping detailed custom field values to ticket keys
 */
export async function getTicketsByDetailedCustomField(releaseVersion: string): Promise<Record<string, string[]>> {
    try {
        console.log(`Mapping tickets by detailed custom field values for Sprint ${releaseVersion}...`);

        const tickets = await getTicketsByRelease(releaseVersion);
        const mappedTickets: Record<string, string[]> = {};

        for (const ticket of tickets) {
            try {
                const detailedTicket = await getTicketDetails(ticket.key);

                let customFieldValue = 'No Custom Field';

                if (detailedTicket.fields.customfield_13018) {
                    const customField = detailedTicket.fields.customfield_13018;

                    if (Array.isArray(customField) && customField.length > 0) {
                        customFieldValue = customField[0].value;
                    } else if (customField && 'value' in customField && customField.value) {
                        customFieldValue = customField.value;
                    }
                }

                if (!mappedTickets[customFieldValue]) {
                    mappedTickets[customFieldValue] = [];
                }

                mappedTickets[customFieldValue].push(ticket.key);

                // Add small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error) {
                console.error(`Failed to get details for ${ticket.key}:`, error);
            }
        }

        return mappedTickets;

    } catch (error: any) {
        console.error(`Failed to get tickets by detailed custom field for Sprint ${releaseVersion}:`, error?.message || error);
        return {};
    }
}

/**
 * Get jobs assigned to specific users
 * @param assigneeNames - Array of assignee names (e.g., ["Luca", "Simon"])
 * @param sprintNumber - Optional sprint number (e.g., "214")
 * @param maxResults - Maximum number of results to return (default: 100)
 * @returns Promise<JiraIssue[]> - Array of JIRA issues assigned to users
 */
export async function getJobsByAssignee(
    assigneeNames: string[],
    sprintNumber?: string,
    maxResults: number = 100
): Promise<JiraIssue[]> {
    try {
        const assigneeList = assigneeNames.join(', ');
        console.log(`Fetching JIRA jobs assigned to [${assigneeList}]${sprintNumber ? ` in sprint ${sprintNumber}` : ''}...`);

        let jqlQuery = `project = JOB AND assignee IN (${assigneeNames.map(name => `'${name}'`).join(', ')})`;
        
        if (sprintNumber) {
            jqlQuery += ` AND sprint = "JOB Sprint ${sprintNumber}"`;
        }
        
        jqlQuery += ' ORDER BY duedate';

        const requestBody = {
            jql: jqlQuery,
            fields: [
                "customfield_10723",
                "summary",
                "priority",
                "assignee", 
                "status",
                "duedate"
            ],
            maxResults: maxResults
        };

        const response = await fetch(`${JIRA_CONFIG.baseUrl}/rest/api/3/search/jql`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${JIRA_CONFIG.auth}`,
                'Cookie': `atlassian.xsrf.token=${JIRA_CONFIG.xsrfToken}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`JIRA API error: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
        }

        const data = await response.json() as JiraSearchResponse;

        console.log(`Found ${data.issues?.length || 0} jobs assigned to [${assigneeList}]${sprintNumber ? ` in sprint ${sprintNumber}` : ''}`);
        return data.issues;

    } catch (error: any) {
        console.error(`Failed to fetch jobs for assignees [${assigneeNames.join(', ')}]:`, error?.message || error);
        throw error;
    }
}

/**
 * Export jobs to Excel file
 * @param assigneeNames - Array of assignee names (e.g., ["Luca", "Simon"])
 * @param sprintNumber - Optional sprint number (e.g., "214")
 * @param inputPath - Path to existing Excel template (default: "./input/BAU Automation.xlsx")
 * @returns Promise<string> - Path to created/updated Excel file
 */
export async function exportJobsToExcel(
    assigneeNames: string[],
    sprintNumber?: string,
    inputPath: string = "./input/BAU Automation.xlsx"
): Promise<string> {
    try {
        const assigneeList = assigneeNames.join(', ');
        console.log(`Exporting jobs for [${assigneeList}]${sprintNumber ? ` in sprint ${sprintNumber}` : ''} to Excel...`);

        // Get jobs from JIRA
        const jobs = await getJobsByAssignee(assigneeNames, sprintNumber);

        const fs = require('fs');
        const path = require('path');

        // Check if input file exists
        if (!fs.existsSync(inputPath)) {
            throw new Error(`Template file not found: ${inputPath}`);
        }

        console.log(`Loading existing Excel template: ${inputPath}`);
        
        // Use ExcelJS to preserve formatting
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(inputPath);

        // Determine sheet name
        const sheetName = sprintNumber ? `Sprint ${sprintNumber}` : 'Jobs';
        
        // Get the worksheet  
        let worksheet = workbook.getWorksheet(sheetName);
        if (!worksheet) {
            // Try to find sheet by partial name match
            worksheet = workbook.worksheets.find((ws: { name: string; }) => 
                ws.name && ws.name.toLowerCase().includes(sheetName.toLowerCase())
            );
        }
        
        if (!worksheet) {
            const availableSheets = workbook.worksheets
                .filter((ws: { name: any; }) => ws.name)
                .map((ws: { name: any; }) => ws.name)
                .join(', ');
            throw new Error(`Sheet "${sheetName}" not found in template. Available sheets: ${availableSheets}`);
        }

        console.log(`Working with sheet: "${worksheet.name}"`);

        // Find the header row (look for "Work items" column)
        let headerRow = -1;
        let workItemsCol = -1;
        
        // Search through the worksheet for headers
        worksheet.eachRow((row: { eachCell: (arg0: (cell: any, colNumber: any) => false | undefined) => void; }, rowNumber: number) => {
            if (headerRow !== -1) return; // Already found
            if (rowNumber > 20) return; // Don't search beyond row 20
            
            row.eachCell((cell: { value: { toString: () => string; }; }, colNumber: number) => {
                if (cell.value && cell.value.toString().toLowerCase().includes('work items')) {
                    headerRow = rowNumber;
                    workItemsCol = colNumber;
                    return false; // Stop searching this row
                }
            });
        });

        if (headerRow === -1) {
            throw new Error(`Header row with "Work items" not found in sheet "${sheetName}"`);
        }

        console.log(`Found headers at row ${headerRow}, starting data insert at row ${headerRow + 1}`);

        // Clear existing data rows but preserve formatting (clear all existing rows)
        const maxExistingRow = worksheet.actualRowCount;
        for (let row = headerRow + 1; row <= maxExistingRow; row++) {
            for (let col = workItemsCol - 1; col <= workItemsCol + 5; col++) {
                const cell = worksheet.getCell(row, col);
                // Clear only the value, keep all styling
                cell.value = null;
            }
        }

        // Insert job data starting from header row + 1
        jobs.forEach((issue, index) => {
            const f = issue.fields;
            const dataRow = headerRow + 1 + index;
            
            // Debug log
            console.log(`Row ${index + 1}: ${issue.key} - Summary: "${f.summary}"`);
            
            // Handle Work Type column (before Work Items)
            const workTypeCell = worksheet.getCell(dataRow, workItemsCol - 1);
            workTypeCell.value = f.customfield_10723?.value || "";
            
            // Handle Work Items column with URL
            const workItemCell = worksheet.getCell(dataRow, workItemsCol);
            workItemCell.value = {
                text: issue.key,
                hyperlink: `https://joblogic.atlassian.net/browse/${issue.key}`
            };
            
            // Handle Summary column (make sure text wrapping is enabled)
            const summaryCell = worksheet.getCell(dataRow, workItemsCol + 1);
            summaryCell.value = f.summary || "";
            summaryCell.alignment = { wrapText: true, vertical: 'top' };
            
            // Handle remaining columns after Summary
            const remainingData = [
                f.priority?.name || "",                     // Priority
                f.assignee?.displayName || "",              // Owner
                f.duedate || "",                            // ETA
                f.status?.name || ""                        // Status
            ];

            remainingData.forEach((value, colIndex) => {
                const cell = worksheet.getCell(dataRow, workItemsCol + 2 + colIndex);
                cell.value = value || "";
            });
        });

        // Save the workbook back to the same file
        await workbook.xlsx.writeFile(inputPath);

        console.log(`Excel template updated successfully: ${inputPath}`);
        console.log(`Sheet: ${sheetName}`);
        console.log(`Data inserted at row ${headerRow + 1} to ${headerRow + jobs.length}`);
        console.log(`Total jobs exported: ${jobs.length}`);

        return inputPath;

    } catch (error: any) {
        console.error(`Failed to export jobs to Excel:`, error?.message || error);
        throw error;
    }
}

/**
 * Print jobs summary for assignees
 * @param assigneeNames - Array of assignee names (e.g., ["Luca", "Simon"])
 * @param sprintNumber - Optional sprint number (e.g., "214")
 */
export async function printJobsSummary(assigneeNames: string[], sprintNumber?: string): Promise<void> {
    try {
        const assigneeList = assigneeNames.join(', ');
        console.log(`\n=== JIRA Jobs for [${assigneeList}]${sprintNumber ? ` in Sprint ${sprintNumber}` : ''} ===\n`);

        const jobs = await getJobsByAssignee(assigneeNames, sprintNumber);

        if (jobs.length === 0) {
            console.log(`No jobs found for [${assigneeList}]${sprintNumber ? ` in Sprint ${sprintNumber}` : ''}`);
            return;
        }

        jobs.forEach((job, index) => {
            const f = job.fields;
            console.log(`${index + 1}. ${job.key}: ${f.summary}`);
            console.log(`   Priority: ${f.priority?.name || 'Not set'}`);
            console.log(`   Owner: ${f.assignee?.displayName || 'Unassigned'}`);
            console.log(`   Status: ${f.status?.name || 'Unknown'}`);
            console.log(`   Due Date: ${f.duedate || 'Not set'}`);
            console.log(''); // Empty line for readability
        });

        console.log(`Total: ${jobs.length} jobs\n`);

    } catch (error: any) {
        console.error(`Failed to print jobs summary:`, error?.message || error);
    }
}

/**
 * Print tickets summary to console
 * @param releaseVersion - Sprint version (e.g., "213")
 */
export async function printTicketsSummary(releaseVersion: string): Promise<void> {
    try {
        console.log(`\n=== JIRA Tickets for Sprint ${releaseVersion} ===\n`);

        const tickets = await getTicketsByRelease(releaseVersion);

        if (tickets.length === 0) {
            console.log(`No tickets found for Sprint ${releaseVersion}`);
            return;
        }

        tickets.forEach((ticket, index) => {
            console.log(`${index + 1}. ${ticket.key}: ${ticket.fields.summary}`);

            if (ticket.fields.customfield_13018) {
                const customField = ticket.fields.customfield_13018;

                if (Array.isArray(customField) && customField.length > 0) {
                    console.log(`   Service Type: ${customField[0].value}`);
                } else if (customField && 'value' in customField && customField.value) {
                    console.log(`   Service Type: ${customField.value}`);
                }
            }

            if (ticket.fields.labels.length > 0) {
                console.log(`   Labels: ${ticket.fields.labels.join(', ')}`);
            }

            if (ticket.fields.components.length > 0) {
                console.log(`   Components: ${ticket.fields.components.map(c => c.name).join(', ')}`);
            }

            console.log(''); // Empty line for readability
        });

        console.log(`Total: ${tickets.length} tickets\n`);

        // Also print unique custom field values
        const customFieldValues = await getCustomFieldValuesByRelease(releaseVersion);
        if (customFieldValues.length > 0) {
            console.log(`\nService Types Array: ${JSON.stringify(customFieldValues)}\n`);
        }

    } catch (error: any) {
        console.error(`Failed to print tickets summary:`, error?.message || error);
    }
}

/**
 * CLI Usage example
 */
if (require.main === module) {
    const command = process.argv[2];
    const restArgs = process.argv.slice(3);

    if (!command) {
        console.log('Usage: npx tsx src/utils/jira/jira.ts <command> <parameters>');
        console.log('');
        console.log('Commands:');
        console.log('  sprint <release_version> [mode]                                    - Get tickets for sprint');
        console.log('  jobs <assignee1> [assignee2] ... [sprint_number] [input_path]      - Export jobs for assignees to Excel');
        console.log('  summary <assignee1> [assignee2] ... [sprint_number]                - Print jobs summary for assignees');
        console.log('');
        console.log('Examples:');
        console.log('  npx tsx src/utils/jira/jira.ts sprint 213');
        console.log('  npx tsx src/utils/jira/jira.ts sprint 213 details');
        console.log('  npx tsx src/utils/jira/jira.ts jobs Luca');
        console.log('  npx tsx src/utils/jira/jira.ts jobs Luca Simon');
        console.log('  npx tsx src/utils/jira/jira.ts jobs Luca Simon 214');
        console.log('  npx tsx src/utils/jira/jira.ts jobs Luca Simon 214 "./custom/template.xlsx"');
        console.log('  npx tsx src/utils/jira/jira.ts summary Luca');
        console.log('  npx tsx src/utils/jira/jira.ts summary Luca Simon 214');
        console.log('');
        console.log('Notes:');
        console.log('  - Requires: npm install exceljs');
        console.log('  - Default Excel template: "./input/BAU Automation.xlsx"');
        console.log('  - Data will be inserted into sheet named "Sprint {number}" or "Jobs"');
        console.log('  - All formatting, colors, and styles will be preserved');
        console.log('');
        console.log('Sprint Modes:');
        console.log('  (default) - Use printTicketsSummary (faster, uses bulk API)');
        console.log('  details   - Use getCustomFieldValuesFromDetails (slower, calls getTicketDetails for each ticket)');
        process.exit(1);
    }

    if (command === 'sprint') {
        const releaseVersion = restArgs[0];
        const mode = restArgs[1];
        
        if (!releaseVersion) {
            console.log('Please provide release version for sprint command');
            process.exit(1);
        }

        if (mode === 'details') {
            // Use the detailed method that calls getTicketDetails for each ticket
            getCustomFieldValuesFromDetails(releaseVersion)
                .then((values) => {
                    console.log('\n=== FINAL RESULT ===');
                    console.log('Custom Field Values Array:', JSON.stringify(values));
                    console.log('JIRA custom field values fetched successfully using getTicketDetails!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    process.exit(1);
                });
        } else {
            // Use the default summary method
            printTicketsSummary(releaseVersion)
                .then(() => {
                    console.log('JIRA tickets fetched successfully!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    process.exit(1);
                });
        }
    } else if (command === 'jobs' || command === 'summary') {
        if (restArgs.length === 0) {
            console.log(`Please provide at least one assignee name for ${command} command`);
            process.exit(1);
        }

        // Parse assignees, sprint number, and input path
        let assigneeNames: string[] = [];
        let sprintNumber: string | undefined;
        let inputPath: string | undefined;

        for (const arg of restArgs) {
            if (/^\d+$/.test(arg)) {
                // It's a number (sprint)
                sprintNumber = arg;
            } else if (arg.includes('/') || arg.includes('\\') || arg.endsWith('.xlsx')) {
                // It's a path
                inputPath = arg;
            } else {
                // It's an assignee name
                assigneeNames.push(arg);
            }
        }

        if (assigneeNames.length === 0) {
            console.log(`Please provide at least one assignee name for ${command} command`);
            process.exit(1);
        }

        if (command === 'jobs') {
            exportJobsToExcel(assigneeNames, sprintNumber, inputPath)
                .then((filePath) => {
                    console.log(`\n=== SUCCESS ===`);
                    console.log(`Excel file updated: ${filePath}`);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    process.exit(1);  
                });
        } else { // summary
            printJobsSummary(assigneeNames, sprintNumber)
                .then(() => {
                    console.log('JIRA jobs summary completed!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    process.exit(1);
                });
        }
    } else {
        console.log(`Unknown command: ${command}`);
        console.log('Use --help or no arguments to see usage information');
        process.exit(1);
    }
}
