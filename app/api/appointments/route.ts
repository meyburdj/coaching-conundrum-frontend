import { NextRequest, NextResponse } from 'next/server';
import { createAppointmentFromServer } from '@/lib/api';

export async function POST(request: NextRequest) {
    try {
        const { start_time, coach_id } = await request.json();
        const appointment = await createAppointmentFromServer(start_time, coach_id);
        return NextResponse.json(appointment, { status: 200 });
    } catch (error) {
        console.error('Failed to book appointment:', error);
        return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
    }
}
