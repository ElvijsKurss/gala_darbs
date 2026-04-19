import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/services/event.service';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  private eventService = inject(EventService);

  events: EventModel[] = [];
  error = '';

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (res) => (this.events = res),
      error: () => (this.error = 'Neizdevās ielādēt pasākumus'),
    });
  }

  join(id: number) {
    this.eventService.joinEvent(id).subscribe({
      next: () => this.loadEvents(),
      error: (err) => alert(err.error?.message || 'Neizdevās pieteikties'),
    });
  }

  leave(id: number) {
    this.eventService.leaveEvent(id).subscribe({
      next: () => this.loadEvents(),
      error: (err) => alert(err.error?.message || 'Neizdevās atcelt dalību'),
    });
  }

  get myEvents() {
    return this.events.filter((e) => e.joined);
  }
}
