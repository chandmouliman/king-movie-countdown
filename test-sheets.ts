import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), '.env.local');
console.log("Loading env from:", envPath);
console.log("File exists:", fs.existsSync(envPath));

const result = dotenv.config({ path: envPath });
if (result.error) {
    console.error("Error loading .env file:", result.error);
}

// Check vars before importing lib
const vars = ['GOOGLE_SHEET_ID', 'GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_PRIVATE_KEY'];
const missing = vars.filter(v => !process.env[v]);
if (missing.length > 0) {
    console.error("Missing env vars in process.env:", missing);
} else {
    console.log("All required env vars are present.");
}

// import { appendToSheet, getSheetCount } from './lib/googleSheets.ts'; // Import after env check

async function test() {
    // Dynamic import to ensure env vars are loaded first
    const { appendToSheet, getSheetCount } = await import('./lib/googleSheets.ts');

    console.log("Testing Google Sheets connection...");
    // console.log("GOOGLE_SHEET_ID present:", !!process.env.GOOGLE_SHEET_ID);
    try {
        const countBefore = await getSheetCount();
        console.log("Current sheet count:", countBefore);

        console.log("Appending test row...");
        await appendToSheet({
            Timestamp: new Date().toISOString(),
            Name: "Test User",
            City: "Test City",
            Mobile: "1234567890"
        });

        const countAfter = await getSheetCount();
        console.log("New sheet count:", countAfter);

        if (countAfter > countBefore) {
            console.log("SUCCESS: Row added.");
        } else {
            console.error("FAILURE: Row count did not increase.");
        }

    } catch (error) {
        console.error("ERROR:", error);
    }
}

test();
