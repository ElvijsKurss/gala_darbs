import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/events';

  getEvents(username: string) {
    return this.http.get<EventModel[]>(`${this.api}?username=${encodeURIComponent(username)}`);
  }

  createEvent(data: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    maxParticipants: number;
  }) {
    return this.http.post<EventModel>(this.api, data);
  }

  joinEvent(id: number, username: string) {
    return this.http.post(`${this.api}/${id}/join?username=${encodeURIComponent(username)}`, {});
  }

  leaveEvent(id: number, username: string) {
    return this.http.delete(`${this.api}/${id}/leave?username=${encodeURIComponent(username)}`);
  }
}
