export interface ScheduleItem {
    id: number;
    period: string;
    subject: string;
    days: string;
    dayKeys: string[];
    hours: string;
    selected?: boolean;
}