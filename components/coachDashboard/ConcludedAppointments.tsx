"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { formatDateTime } from "@/lib/helpers";
import { CoachAppointment } from "@/types";
import { ReviewForm, ReviewFormValues } from "./ReviewForm";

interface PastAppointmentsProps {
    pastAppointments: CoachAppointment[];
}

export function ConcludedAppointments({ pastAppointments: initialPastAppointments }: PastAppointmentsProps) {
    const [pastAppointments, setPastAppointments] = useState<CoachAppointment[]>(initialPastAppointments);

    const handleCreateReview = async (appointmentId: number, data: ReviewFormValues) => {
        try {
            const payload = {
                appointmentId: appointmentId,
                satisfaction_score: parseInt(data.rating),
                review: data.review,
            };

            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const updatedReview = await response.json();

                setPastAppointments(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment.id === appointmentId
                            ? {
                                ...appointment,
                                review: {
                                    ...appointment.review,
                                    appointment_id: appointmentId,
                                    satisfaction_score: updatedReview.satisfaction_score,
                                    notes: updatedReview.notes
                                }
                            }
                            : appointment
                    )
                );

                toast({
                    title: "Review Submitted",
                    description: "Your review has been successfully submitted.",
                });
            } else {
                throw new Error("Failed to submit review");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit review. Please try again.",
                variant: "destructive",
            });
            console.error(error);
        }
    };

    return (
        <Card className="h-full max-h-[50vh] overflow-y-auto shadow-md">
            <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {pastAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium">{formatDateTime(appointment.start_time).date}</div>
                                <div className="text-gray-500">
                                    {formatDateTime(appointment.start_time).startTime} - {formatDateTime(appointment.start_time).endTime}
                                </div>
                                <div className="text-gray-500">{appointment.student_name}</div>
                            </div>
                            <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
                                {appointment.student_id ? `Phone # ${appointment.phone_number}` : "Unbooked"}
                            </div>
                        </div>
                        {appointment.review && appointment.review.notes ? (
                            <div className="bg-gray-100 p-2 rounded-md">
                                <div className="font-medium">Review</div>
                                <div>{appointment.review.notes}</div>
                                <div className="text-yellow-500">Rating: {appointment.review.satisfaction_score}</div>
                            </div>
                        ) : (
                            <ReviewForm appointmentId={appointment.id} onSubmitReview={handleCreateReview} />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
