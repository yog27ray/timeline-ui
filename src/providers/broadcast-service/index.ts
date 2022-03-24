import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface BroadcastEvent {
  key: string;
  data?: any;
}

@Injectable()
export class BroadcastService {
  eventBus: Subject<BroadcastEvent>;

  constructor() {
    this.eventBus = new Subject<BroadcastEvent>();
  }

  broadcast(key: string, data?: any): void {
    this.eventBus.next({ key, data });
  }

  on<T>(key: string): Observable<T> {
    return this.eventBus.asObservable()
      .pipe(
        filter((event: BroadcastEvent): boolean => event.key === key),
        map((event: BroadcastEvent): T => event.data));
  }
}
