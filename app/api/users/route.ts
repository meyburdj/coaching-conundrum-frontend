import { NextRequest, NextResponse } from 'next/server';
import { createUserFromServer } from '@/lib/api';

export async function POST(request: NextRequest) {
    try {
        const { name, phone_number, role } = await request.json();
        const user = await createUserFromServer(name, phone_number, role);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Failed to create user:', error);
        return NextResponse.json({ error: 'Failed to book appointment' }, { status: 500 });
    }
}
