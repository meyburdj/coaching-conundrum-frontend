"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { UpcomingAppointment } from "@/types"
import { formatDateTime } from "@/lib/helpers"

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
                {appointments.map((appointment) => {
                    const { date, startTime, endTime } = formatDateTime(appointment.start_time);
                    return (
                        <div key={appointment.id} className="flex items-center justify-between">
                            <div>
                                <div className="font-medium">{date}</div>
                                <div className="text-gray-500">{startTime} - {endTime}</div>
                                <div className="text-gray-500">Coach {appointment.coach_name}</div>
                            </div>
                            <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
                                phone # {appointment.phone_number}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    )
}
