export interface User {
    id: number
    name: string
    phoneNumber: string
    role: 'student' | 'coach'
}

export interface Appointment {
    id: number
    start_time: string;
    coachId: number
    studentId?: number
    coach_name: string
    phone_number?: string
}

export interface AppointmentReview {
    id: number
    appointmentId: number
    satisfactionScore: number
    notes: string
}

export interface AvailableAppointment extends Pick<Appointment, 'id' | 'start_time' | 'coach_name'> { }

export interface UpcomingAppointment extends Pick<Appointment, 'id' | 'start_time' | 'phone_number' | 'coach_name'> { }
