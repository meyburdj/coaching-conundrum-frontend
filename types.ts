export interface User {
    id: number
    name: string
    phoneNumber: string
    role: 'student' | 'coach'
}

export interface Appointment {
    id: number
    date: string
    time: string
    coachId: number
    studentId?: number
    coachName: string
    coachPhoneNumber?: string
}

export interface AppointmentReview {
    id: number
    appointmentId: number
    satisfactionScore: number
    notes: string
}

export interface AvailableAppointment extends Pick<Appointment, 'id' | 'date' | 'time' | 'coachName'> { }

export interface UpcomingAppointment extends Pick<Appointment, 'id' | 'date' | 'time' | 'coachPhoneNumber'> { }
