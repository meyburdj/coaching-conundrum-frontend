import { AvailableAppointment } from "@/types";

export async function fetchAvailableAppointmentsFromClient(selected_time: string): Promise<AvailableAppointment[]> {
    const response = await fetch(`/api/availableappointments?available=true&selected_time=${selected_time}`);
    if (!response.ok) {
        throw new Error('Failed to fetch appointments');
    }
    const data = await response.json();
    return data;
}

export async function bookAppointmentFromClient(appointmentId: number, studentId: number): Promise<AvailableAppointment> {
    console.log('params from clien api', studentId, appointmentId)
    const response = await fetch(`/api/bookappointment`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: studentId, appointmentId: appointmentId }),
    });

    if (!response.ok) {
        throw new Error('Failed to book appointment');
    }

    return response.json();
}
