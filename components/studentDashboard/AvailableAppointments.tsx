"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AvailableAppointment } from "@/types"
import { formatDateTime } from "@/lib/helpers"

interface AvailableAppointmentsProps {
    appointments: AvailableAppointment[]
}

export function AvailableAppointments({ appointments }: AvailableAppointmentsProps) {
    return (
        <Card className="h-full max-h-[70vh] overflow-y-auto shadow-md">
            <CardHeader>
                <CardTitle>Available Appointments</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    {appointments.map((appointment) => {
                        const { date, startTime, endTime } = formatDateTime(appointment.start_time);
                        return (
                            <div key={appointment.id} className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{date}</div>
                                    <div className="text-gray-500 dark:text-gray-400">{startTime} - {endTime}</div>
                                    <div className="text-gray-500 dark:text-gray-400">Coach: {appointment.coach_name}</div>
                                </div>
                                <Button size="sm">Book</Button>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
