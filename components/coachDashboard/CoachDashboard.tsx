"use client"
import { useState } from "react"
import { CoachAppointment } from "@/types"
import { Card } from "../ui/card"
import { CreateAppointmentForm } from "./CreateAppointmentForm"
import { CoachUpcomingAppointments } from "./UpcomingAppointments"
import { ConcludedAppointments } from "./ConcludedAppointments"
import { SubmitHandler } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { AppointmentFormValues } from "./CreateAppointmentForm"

export function CoachDashboard({ initialAppointments, coach_id }:
    {
        initialAppointments: CoachAppointment[],
        coach_id: number
    }
) {
    const [upcomingAppointments, setUpcomingAppointments] = useState<CoachAppointment[]>(
        initialAppointments.filter(
            (appointment) => new Date(appointment.start_time) > new Date()
        ));

    const pastAppointments = initialAppointments.filter(
        (appointment) => new Date(appointment.start_time) < new Date() && appointment.student_id !== null
    );

    const onSubmit: SubmitHandler<AppointmentFormValues> = async (data) => {
        try {
            const date = data.appointmentDate;
            const hours = data.appointmentPeriod === "PM" && data.appointmentHour !== 12
                ? data.appointmentHour + 12
                : data.appointmentPeriod === "AM" && data.appointmentHour === 12
                    ? 0
                    : data.appointmentHour;
            const appointmentDateTime = new Date(date);
            appointmentDateTime.setHours(hours, data.appointmentMinute);

            const formattedDateTime = appointmentDateTime.toISOString();

            const payload = {
                start_time: formattedDateTime,
                coach_id: coach_id
            };

            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast({
                    title: "Appointment Created",
                    description: "Your appointment has been successfully created.",
                });

                const newAppointment: CoachAppointment = await response.json();
                setUpcomingAppointments(prevAppointments =>
                    [...prevAppointments, newAppointment].sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
                );
            } else {
                throw new Error("Failed to create appointment");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create appointment. Please try again.",
                variant: "destructive",
            });
            console.error(error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-10 ">
            <div className="md:col-span-1 ">
                <div>
                    <CreateAppointmentForm
                        coach_id={coach_id}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
            <div className="md:col-span-1 h-full">
                <Card className="h-full max-h-[70vh] overflow-y-auto shadow-md">
                    <CoachUpcomingAppointments
                        upcomingAppointments={upcomingAppointments}
                    />
                </Card>            </div>
            <div className="md:col-span-1 h-full">
                <Card className="h-full max-h-[70vh] overflow-y-auto shadow-md">
                    <ConcludedAppointments
                        pastAppointments={pastAppointments}
                    />
                </Card>
            </div>
        </div>
    )
}