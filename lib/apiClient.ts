import { AvailableAppointment } from "@/types";

export async function fetchAvailableAppointmentsFromClient(selected_time: string): Promise<AvailableAppointment[]> {
    const response = await fetch(`/api/availableappointments?available=true&selected_time=${selected_time}`);
    if (!response.ok) {
        throw new Error('Failed to fetch appointments');
    }
    const data = await response.json();
    return data;
}