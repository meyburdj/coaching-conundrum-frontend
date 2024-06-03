import { StudentDashboard } from "@/components/studentDashboard/StudentDashboard";
import {
    fetchAvailableAppointments,
    fetchUpcomingAppointmentsFromServer,
    fetchCoachAppointmentsFromServer
} from "@/lib/api";
import { AvailableAppointment, UpcomingAppointment, CoachAppointment } from "@/types";
import { formatDate } from "@/lib/helpers";
import { CoachDashboard } from "@/components/coachDashboard/CoachDashboard";

interface SearchParams {
    role: string;
}

export default async function Dashboard({ params, searchParams }: { params: { id: number }, searchParams: SearchParams }) {
    const userId = params.id;
    const role = searchParams.role;

    if (role === 'coach') {
        const initialAppointments: CoachAppointment[] = await fetchCoachAppointmentsFromServer(userId);
        return (
            <CoachDashboard
                initialAppointments={initialAppointments}
                coach_id={userId}
            />);
    } else {
        const [bookedAppointments, availableAppointments]:
            [UpcomingAppointment[], AvailableAppointment[]] = await Promise.all([
                fetchUpcomingAppointmentsFromServer(userId),
                fetchAvailableAppointments(formatDate(new Date()), true)
            ]);
        return (
            <StudentDashboard
                initialAvailableAppointments={availableAppointments}
                studentId={userId}
                initialBookedAppointments={bookedAppointments}
            />
        );
    }
}