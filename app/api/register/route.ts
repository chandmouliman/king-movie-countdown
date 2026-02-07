import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the CSV file
const filePath = path.join(process.cwd(), 'public', 'registrations.csv');

// Helper to ensure file exists with header
const ensureFile = () => {
    if (!fs.existsSync(filePath)) {
        const header = 'Timestamp,Name,City,Mobile\n';
        fs.writeFileSync(filePath, header, 'utf8');
    }
};

export async function GET() {
    ensureFile();
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const lines = fileContent.trim().split('\n');
        // Count is total lines minus header. If file is empty or just header, count is 0.
        const count = Math.max(0, lines.length - 1);

        return NextResponse.json({ count });
    } catch (error) {
        console.error("Error reading registrations:", error);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}

export async function POST(request: Request) {
    ensureFile();
    try {
        const body = await request.json();
        const { name, city, mobile } = body;

        if (!name || !city || !mobile) {
            return NextResponse.json({ error: "Name, City, and Mobile are required" }, { status: 400 });
        }

        // Sanitize input to prevent CSV injection (basic)
        const sanitizedName = name.replace(/,/g, ' ');
        const sanitizedCity = city.replace(/,/g, ' ');
        const sanitizedMobile = mobile.replace(/,/g, ' ');
        const timestamp = new Date().toISOString();

        const newRow = `${timestamp},${sanitizedName},${sanitizedCity},${sanitizedMobile}\n`;

        fs.appendFileSync(filePath, newRow, 'utf8');

        // Get updated count
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const lines = fileContent.trim().split('\n');
        const count = Math.max(0, lines.length - 1);

        return NextResponse.json({ success: true, count });
    } catch (error) {
        console.error("Error saving registration:", error);
        return NextResponse.json({ error: "Failed to save registration" }, { status: 500 });
    }
}
