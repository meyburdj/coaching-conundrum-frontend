import { AvailableAppointment, UpcomingAppointment } from "@/types";

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

export async function fetchUpcomingAppointments(studentId: number): Promise<UpcomingAppointment[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/student/${studentId}`, { next: { revalidate: 0 } });
    if (!response.ok) {
        throw new Error("Failed to fetch upcoming appointments");
    }
    return response.json();
}