//Formats a Date object to a string in the format 'YYYY-MM-DD'
export const formatDate = (date: Date) => date.toISOString().split('T')[0];

/**
Formats a date-time string to an object containing formatted date, start time, 
and end time. Duration impacts endTime returned.

i.e. dateTimeString => { date: "April 15, 2024", startTime: "10:00 AM", 
                        endTime: "12:00 PM" }
 */
export function formatDateTime(dateTimeString: string, duration: number = 2) {
    const date = new Date(dateTimeString);

    const optionsDate: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTimeStart = date.toLocaleTimeString('en-US', optionsTime);

    const endDate = new Date(date.getTime() + duration * 60 * 60 * 1000);
    const formattedTimeEnd = endDate.toLocaleTimeString('en-US', optionsTime);

    return { date: formattedDate, startTime: formattedTimeStart, endTime: formattedTimeEnd };
}