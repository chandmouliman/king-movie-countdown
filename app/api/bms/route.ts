
import { NextResponse } from 'next/server';

export async function GET() {
    const BMS_URL = "https://in.bookmyshow.com/movies/hyderabad/king/ET00455480";
    // Fallback to the live value we found if scraping fails
    const FALLBACK_COUNT = 54600;

    try {
        const res = await fetch(BMS_URL, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Cache-Control": "no-cache"
            },
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (!res.ok) {
            console.warn(`BMS Fetch failed: ${res.status}`);
            return NextResponse.json({ count: FALLBACK_COUNT, source: 'fallback', live: false });
        }

        const text = await res.text();

        // Pattern: "54.6K+ are interested" or similar
        // Regex to capture the number part: "54.6K", "100.2K", "1M"
        const match = text.match(/([0-9,.]+[KkMm]?)\+?\s*are interested/);

        if (match && match[1]) {
            let numStr = match[1].toUpperCase();
            let multiplier = 1;

            if (numStr.includes('K')) {
                multiplier = 1000;
                numStr = numStr.replace('K', '');
            } else if (numStr.includes('M')) {
                multiplier = 1000000;
                numStr = numStr.replace('M', '');
            }

            const count = Math.floor(parseFloat(numStr) * multiplier);
            return NextResponse.json({ count, source: 'live', live: true });
        }

        // Attempt to find in __INITIAL_STATE__ if text regex fails
        if (text.includes("__INITIAL_STATE__")) {
            // Simple string search fallback for "interested" count in JSON
            // This is less robust but a good backup
            // Looking for "count":54600 or similar might be hard without parsing
            // So we default to fallback if regex fails
        }

        return NextResponse.json({ count: FALLBACK_COUNT, source: 'fallback-no-match', live: false });

    } catch (error) {
        console.error("BMS API Error:", error);
        return NextResponse.json({ count: FALLBACK_COUNT, source: 'error', live: false });
    }
}
