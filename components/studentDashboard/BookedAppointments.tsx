"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { UpcomingAppointment } from "@/types"

interface UpcomingAppointmentsProps {
    appointments: UpcomingAppointment[]
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
    return (
        <Card className="h-full max-h-[50vh] overflow-y-auto shadow-md">
            <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">{appointment.date}</div>
                            <div className="text-gray-500 dark:text-gray-400">{appointment.time}</div>
                        </div>
                        <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm">
                            phone # {appointment.coachPhoneNumber}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
