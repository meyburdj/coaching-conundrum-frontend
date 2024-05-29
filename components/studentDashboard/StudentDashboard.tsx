"use client"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { AvailableAppointments } from "./AvailableAppointments"
import { UpcomingAppointments } from "./BookedAppointments"
import { UpcomingAppointment, AvailableAppointment } from "@/types"
export function StudentDashboard() {
    const [date, setDate] = useState<Date | undefined>()

    const availableAppointments: AvailableAppointment[] = [
        { id: 1, date: "April 15, 2023", time: "10:00 AM - 11:00 AM", coachName: "Tom Stein" },
        { id: 2, date: "April 16, 2023", time: "2:00 PM - 3:00 PM", coachName: "Brooklyn Sharon" },
        { id: 3, date: "April 17, 2023", time: "9:00 AM - 10:00 AM", coachName: "Jared Brown" },
    ]

    const upcomingAppointments: UpcomingAppointment[] = [
        { id: 4, date: "April 12, 2023", time: "3:00 PM - 4:00 PM", coachPhoneNumber: "123-456-7890" },
        { id: 5, date: "April 14, 2023", time: "11:00 AM - 12:00 PM", coachPhoneNumber: "234-567-8901" },
        { id: 6, date: "April 18, 2023", time: "2:00 PM - 3:00 PM", coachPhoneNumber: "345-678-9012" },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10">
            <div className="md:col-span-1 ">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </div>
            <div className="md:col-span-1 h-full">
                <AvailableAppointments appointments={availableAppointments} />
            </div>
            <div className="md:col-span-1 h-full">
                <UpcomingAppointments appointments={upcomingAppointments} />
            </div>
        </div>
    )
}