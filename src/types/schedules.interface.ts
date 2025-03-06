export interface ISchedule {
    branch: string;
    hospitalName: string;
    department: string;
    doctor: string;
    date: string; // Stored as a string (e.g., "Sat Feb 15 2025")
    startTime: string; // Stored as a string (e.g., "1:30:00 AM")
    endTime: string; // Stored as a string (e.g., "2:30:00 AM")
    userId: string;
    userName: string;
}