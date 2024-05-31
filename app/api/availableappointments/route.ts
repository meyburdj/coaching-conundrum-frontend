import { fetchAvailableAppointments } from "@/lib/api";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const selected_time = searchParams.get('selected_time');
    const available = searchParams.get('available') === 'true';

    try {
        const appointments = await fetchAvailableAppointments(selected_time as string, available);
        return NextResponse.json(appointments, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch available appointments:", error);
        return NextResponse.json({ error: 'Failed to fetch available appointments' }, { status: 500 });
    }
}