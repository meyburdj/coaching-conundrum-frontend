"use client"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { AvailableAppointments } from "./AvailableAppointments"
import { UpcomingAppointments } from "./BookedAppointments"
import { UpcomingAppointment, AvailableAppointment } from "@/types"
import { formatDate } from "@/lib/helpers"
import { fetchAvailableAppointmentsFromClient } from "@/lib/apiClient"
import { bookAppointmentFromClient } from "@/lib/apiClient"
import { Card } from "../ui/card"

export function StudentDashboard({ initialAvailableAppointments, initialBookedAppointments, studentId }:
    {
        initialAvailableAppointments: AvailableAppointment[],
        initialBookedAppointments: UpcomingAppointment[],
        studentId: number
    }
) {
    const [date, setDate] = useState<Date | undefined>()
    const [availableAppointments, setAvailableAppointments] = useState<AvailableAppointment[]>(initialAvailableAppointments)
    const [bookedAppointments, setBookedAppointments] = useState<UpcomingAppointment[]>(initialBookedAppointments)

    /**Take availableAppointments and find all unique dates so that map can 
     * signify days with available appointments**/
    function getUniqueDates(appointments: AvailableAppointment[]) {
        const dateSet = new Set<string>();
        appointments.forEach((appointment) => {
            const date = new Date(appointment.start_time).toDateString();
            dateSet.add(date);
        });
        return Array.from(dateSet).map(date => new Date(date));
    }

    const highlightDates = getUniqueDates(availableAppointments);

    /** When the user navigates to a different month, this function sets the date to the first
     * day of the selected month, formats this date for querying, and fetches the available 
     * appointments for that month from the backend. The fetched appointments are then used 
     * to update the state of available appointments.*/
    async function handleMonthChange(date: Date) {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

        setDate(firstDayOfMonth);

        const selected_time = formatDate(firstDayOfMonth);
        try {
            const newAppointments = await fetchAvailableAppointmentsFromClient(selected_time);
            setAvailableAppointments(newAppointments);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        }
    }


    //Filters the available appointments to only include those on or after the selected date.
    function filterAppointmentsByDate(appointments: AvailableAppointment[], selectedDate: Date | undefined): AvailableAppointment[] {
        if (!selectedDate) return appointments;
        const selectedDateString = formatDate(selectedDate);
        const filteredAppointments = appointments.filter(appointment => {
            const appointmentDateString = formatDate(new Date(appointment.start_time));
            return appointmentDateString >= selectedDateString;
        });
        return filteredAppointments
    }
    const filteredAppointments = filterAppointmentsByDate(availableAppointments, date);

    const handleBook = async (appointmentId: number, studentId: number) => {
        try {
            const bookedAppointment = await bookAppointmentFromClient(appointmentId, studentId);
            setAvailableAppointments(prevAppointments =>
                prevAppointments.filter(appointment => appointment.id !== appointmentId)
            );
            setBookedAppointments(prevBookedAppointments => {
                //TODO: could do via finding target with binary search and splicing in new bookedAppointment
                const newBookedAppointments = [...prevBookedAppointments, bookedAppointment];
                return newBookedAppointments.sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
            });
        } catch (error) {
            console.error("Failed to book appointment:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10 ">
            <div className="md:col-span-1 ">
                <Card className="h-full max-h-[70vh] overflow-y-auto shadow-md">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md "
                        highlightDates={highlightDates}
                        onMonthChange={handleMonthChange}
                    />
                </Card>
            </div>
            <div className="md:col-span-1 h-full">
                <AvailableAppointments appointments={filteredAppointments} studentId={studentId} handleBook={handleBook} />
            </div>
            <div className="md:col-span-1 h-full">
                <UpcomingAppointments appointments={bookedAppointments} />
            </div>
        </div>
    )
}