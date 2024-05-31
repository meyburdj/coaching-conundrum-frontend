import { StudentDashboard } from "@/components/studentDashboard/StudentDashboard";
import { fetchAvailableAppointments, fetchUpcomingAppointments } from "@/lib/api";
import { AvailableAppointment } from "@/types";
import { formatDate } from "@/lib/helpers";

export default async function Dashboard({ params }: { params: { userId: string } }) {
    const userURL = new URL(`${process.env.BACKEND_API_URL}/artworks/${params.userId}`);

    const availableAppointments: AvailableAppointment[] = await fetchAvailableAppointments(formatDate(new Date()), true);
    console.log("availableAppointments", availableAppointments)
    return (
        <StudentDashboard initialAvailableAppointments={availableAppointments} />
    );
}
