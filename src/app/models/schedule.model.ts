export interface ScheduleItem {
    id: number;
    period: string;
    subject: string;
    days: string;
    hours: string;
    selected?: boolean;
}