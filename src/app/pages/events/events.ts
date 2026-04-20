import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/services/event.service';
import { EventModel } from '../../models/event.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  private eventService = inject(EventService);
  private authService = inject(AuthService);

  events: EventModel[] = [];
  error = '';

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    const username = this.authService.getUsername();

    this.eventService.getEvents(username).subscribe({
      next: (res) => {
        this.events = res;
      },
      error: () => {
        this.error = 'Neizdevās ielādēt pasākumus';
      },
    });
  }

  join(id: number) {
    const username = this.authService.getUsername();

    if (!username) {
      alert('Nav atrasts lietotājs. Lūdzu, pieslēdzies vēlreiz.');
      return;
    }

    this.eventService.joinEvent(id, username).subscribe({
      next: () => this.loadEvents(),
      error: (err) => alert(err.error?.message || 'Neizdevās pieteikties'),
    });
  }

  leave(id: number) {
    const username = this.authService.getUsername();

    if (!username) {
      alert('Nav atrasts lietotājs. Lūdzu, pieslēdzies vēlreiz.');
      return;
    }

    this.eventService.leaveEvent(id, username).subscribe({
      next: () => this.loadEvents(),
      error: (err) => alert(err.error?.message || 'Neizdevās atcelt dalību'),
    });
  }
}
