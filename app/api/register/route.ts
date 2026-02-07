import { NextResponse } from 'next/server';
import { appendToSheet, getSheetCount } from '@/lib/googleSheets';

export async function GET() {
    try {
        const count = await getSheetCount();
        return NextResponse.json({ count });
    } catch (error) {
        console.error("Error reading from Google Sheets:", error);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, city, mobile } = body;

        if (!name || !city || !mobile) {
            return NextResponse.json({ error: "Name, City, and Mobile are required" }, { status: 400 });
        }

        const timestamp = new Date().toISOString();

        await appendToSheet({
            Timestamp: timestamp,
            Name: name,
            City: city,
            Mobile: mobile
        });

        const count = await getSheetCount();

        return NextResponse.json({ success: true, count });
    } catch (error) {
        console.error("Error saving to Google Sheets:", error);
        return NextResponse.json({ error: "Failed to save registration" }, { status: 500 });
    }
}
