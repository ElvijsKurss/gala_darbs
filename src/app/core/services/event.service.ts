import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/events';

  getEvents() {
    return this.http.get<EventModel[]>(this.api);
  }

  createEvent(data: any) {
    return this.http.post<EventModel>(this.api, data);
  }

  joinEvent(id: number) {
    return this.http.post(`${this.api}/${id}/join`, {});
  }

  leaveEvent(id: number) {
    return this.http.delete(`${this.api}/${id}/leave`);
  }
}
