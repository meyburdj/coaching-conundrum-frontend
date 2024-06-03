import { NextRequest, NextResponse } from 'next/server';
import { bookAppointmentFromServer } from '@/lib/api';

export async function PATCH(request: NextRequest) {
    try {
        const { appointmentId, student_id } = await request.json();
        const appointment = await bookAppointmentFromServer(appointmentId, student_id);
        return NextResponse.json(appointment, { status: 200 });
    } catch (error) {
        console.error('Failed to book appointment:', error);
        return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
    }
}
