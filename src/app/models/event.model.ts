export interface EventModel {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  registeredCount: number;
  full: boolean;
  cancelled: boolean;
  joined: boolean;
  createdBy: string;
}
