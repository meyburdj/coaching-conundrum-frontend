import { AvailableAppointment, UpcomingAppointment, User, Appointment, CoachAppointment, AppointmentReview } from "@/types";

export async function fetchAvailableAppointments(selectedTime?: string, available?: boolean): Promise<AvailableAppointment[]> {
    const queryParams = new URLSearchParams();
    if (selectedTime) queryParams.append("selected_time", selectedTime);
    if (available !== undefined) queryParams.append("available", available.toString());

    const response = await fetch(`${process.env.BACKEND_API_URL}/appointments?${queryParams.toString()}`, { next: { revalidate: 0 } });
    if (!response.ok) {
        throw new Error("Failed to fetch available appointments");
    }
    return response.json();
}

export async function fetchUpcomingAppointmentsFromServer(studentId: number): Promise<UpcomingAppointment[]> {
    const response = await fetch(`${process.env.BACKEND_API_URL}/appointments/student/${studentId}`, { next: { revalidate: 0 } });
    if (!response.ok) {
        throw new Error("Failed to fetch upcoming appointments");
    }
    return response.json();
}

export async function bookAppointmentFromServer(appointmentId: number, studentId: number): Promise<AvailableAppointment> {
    const response = await fetch(`${process.env.BACKEND_API_URL}/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: studentId }),
    });

    if (!response.ok) {
        throw new Error('Failed to book appointment');
    }

    return response.json();
}

export async function createUserFromServer(name: string, phone_number: string, role: string): Promise<User> {
    const response = await fetch(`${process.env.BACKEND_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone_number, role }),
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    return response.json();
}
export async function createAppointmentFromServer(start_time: string, coach_id: number): Promise<Appointment> {
    const response = await fetch(`${process.env.BACKEND_API_URL}/appointments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ start_time, coach_id }),
    });

    if (!response.ok) {
        throw new Error('Failed to create appointment');
    }

    return response.json();
}

export async function fetchUsersFromServer(): Promise<User[]> {
    const response = await fetch(`${process.env.BACKEND_API_URL}/users`, { next: { revalidate: 0 } });
    if (!response.ok) {
        throw new Error("Failed to fetch upcoming appointments");
    }
    return response.json();
}

export async function fetchCoachAppointmentsFromServer(coach_id: number): Promise<CoachAppointment[]> {
    const response = await fetch(`${process.env.BACKEND_API_URL}/appointments/coach/${coach_id}`, { next: { revalidate: 0 } });
    if (!response.ok) {
        throw new Error("Failed to fetch upcoming appointments");
    }
    return response.json();
}

export async function createReviewFromServer(appointmentId: number,
    satisfaction_score: number, review: string): Promise<AppointmentReview> {
    const response = await fetch(`${process.env.BACKEND_API_URL}/appointments/${appointmentId}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ satisfaction_score, notes: review }),
    });

    if (!response.ok) {
        throw new Error('Failed to create appointment');
    }

    return response.json();
}