export interface User {
    id: number;
    name: string;
    phoneNumber: string;
    role: 'student' | 'coach';
}

export interface Appointment {
    id: number;
    start_time: string;
    coachId: number;
    studentId?: number;
    coach_name: string;
    phone_number?: string;
}

export interface CoachAppointment {
    id: number;
    start_time: string;
    coach_id: number;
    coach_name: string;
    student_id: number;
    phone_number: string;
    student_name: string;
    review: AppointmentReview;

}

export interface AppointmentReview {
    id: number;
    appointment_id: number;
    satisfaction_score: number;
    notes: string;
}

export interface User {
    id: number;
    name: string;
    phone_number: string;
    role: 'student' | 'coach';
}

export interface AvailableAppointment extends Pick<Appointment, 'id' | 'start_time' | 'coach_name'> { }

export interface UpcomingAppointment extends Pick<Appointment, 'id' | 'start_time' | 'phone_number' | 'coach_name'> { }
