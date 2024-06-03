"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CoachAppointment } from "@/types";
import { formatDateTime } from "@/lib/helpers";

interface CoachUpcomingAppointmentsProps {
    upcomingAppointments: CoachAppointment[];
}

export function CoachUpcomingAppointments({ upcomingAppointments }: CoachUpcomingAppointmentsProps) {


    return (
        <Card className="h-full max-h-[50vh] overflow-y-auto shadow-md">
            <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {upcomingAppointments.map((appointment) => {
                    const { date, startTime, endTime } = formatDateTime(appointment.start_time);
                    return (
                        <div key={appointment.id} className="flex items-center justify-between">
                            <div>
                                <div className="font-medium">{date}</div>
                                <div className="text-gray-500 ">
                                    {startTime} - {endTime}
                                </div>
                                {appointment.student_id && (
                                    <div className="text-gray-500 ">
                                        Student: {appointment.student_name}
                                    </div>
                                )}
                            </div>
                            {appointment.student_id
                                ?
                                (<div className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
                                    Phone # {`${appointment.phone_number}`}
                                </div>
                                )
                                : <div className="px-2 py-1 rounded-full bg-gray-300 text-gray-600 font-medium text-sm">
                                    Unbooked
                                </div>}
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
