import { StudentDashboard } from "@/components/studentDashboard/StudentDashboard";
import { fetchAvailableAppointments, fetchUpcomingAppointmentsFromServer } from "@/lib/api";
import { AvailableAppointment, UpcomingAppointment } from "@/types";
import { formatDate } from "@/lib/helpers";

export default async function Dashboard({ params }: { params: { id: number } }) {
    const studentId = params.id

    const bookedAppointments: UpcomingAppointment[] = await fetchUpcomingAppointmentsFromServer(studentId);
    const availableAppointments: AvailableAppointment[] = await fetchAvailableAppointments(formatDate(new Date()), true);
    console.log("availableAppointments", availableAppointments)
    return (
        <StudentDashboard initialAvailableAppointments={availableAppointments} studentId={studentId} initialBookedAppointments={bookedAppointments} />
    );
}
