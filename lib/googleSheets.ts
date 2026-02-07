import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Config variables
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle newlines

if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Sheets credentials missing');
}

// Singleton instance
let doc: GoogleSpreadsheet | null = null;

export const loadSheet = async () => {
    if (doc) return doc;

    const jwt = new JWT({
        email: GOOGLE_CLIENT_EMAIL,
        key: GOOGLE_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const newDoc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
    await newDoc.loadInfo();
    doc = newDoc;
    return doc;
};

export const appendToSheet = async (data: { Timestamp: string, Name: string, City: string, Mobile: string }) => {
    const doc = await loadSheet();
    const sheet = doc.sheetsByIndex[0]; // First sheet
    await sheet.addRow(data);
};

export const getSheetCount = async () => {
    const doc = await loadSheet();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    return rows.length; // Count of registered users (excluding header if handled correctly by lib, usually rows are data rows)
};
