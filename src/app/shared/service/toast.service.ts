import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error';
  onClose?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage | null>();
  toastState$ = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' = 'success', onClose?: () => void) {
    this.toastSubject.next({ message, type, onClose });
  }

  hide() {
    this.toastSubject.next(null);
  }
}
