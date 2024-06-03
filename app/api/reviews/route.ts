import { NextRequest, NextResponse } from 'next/server';
import { createReviewFromServer } from '@/lib/api';

export async function POST(request: NextRequest) {
    try {
        const { satisfaction_score, review, appointmentId } = await request.json();
        const appointmentReview = await createReviewFromServer(appointmentId, satisfaction_score, review);
        return NextResponse.json(appointmentReview, { status: 200 });
    } catch (error) {
        console.error('Failed to write review:', error);
        return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
    }
}
