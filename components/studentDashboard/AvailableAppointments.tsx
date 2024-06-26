"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AvailableAppointment } from "@/types"
import { formatDateTime } from "@/lib/helpers"


interface AvailableAppointmentsProps {
    appointments: AvailableAppointment[],
    studentId: number,
    handleBook: (appointmentId: number, studentId: number) => void
}

export function AvailableAppointments({ appointments, studentId, handleBook }: AvailableAppointmentsProps) {

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
                                    <div className="text-gray-500">{startTime} - {endTime}</div>
                                    <div className="text-gray-500">Coach: {appointment.coach_name}</div>
                                </div>
                                <Button onClick={() => handleBook(appointment.id, studentId)}>
                                    Book
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
