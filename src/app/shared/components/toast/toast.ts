import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastMessage, ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit, OnDestroy {
  toast: ToastMessage | null = null;
  progress = 100;

  private sub!: Subscription;
  private intervalId: any;
  private totalDuration = 3000; // 3 Seconds
  private timeRemaining = 3000;
  private lastTick!: number;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.sub = this.toastService.toastState$.subscribe((state) => {
      this.toast = state;
      if (state) {
        this.resetAndStartTimer();
      } else {
        this.clearTimer();
      }
    });
  }

  resetAndStartTimer() {
    this.clearTimer();
    this.progress = 100;
    this.timeRemaining = this.totalDuration;
    this.startTimer();
  }

  startTimer() {
    this.lastTick = Date.now();
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const delta = now - this.lastTick;
      this.lastTick = now;

      this.timeRemaining -= delta;
      this.progress = (this.timeRemaining / this.totalDuration) * 100;

      if (this.timeRemaining <= 0) {
        this.progress = 0;
        this.closeToast(true); // true matlab line khud end hui hai
      }
    }, 16);
  }

  pauseTimer() {
    clearInterval(this.intervalId);
  }

  resumeTimer() {
    if (this.timeRemaining > 0) {
      this.startTimer();
    }
  }

  // triggerCallback check karega ki button se band hua ya khud se end hua
  closeToast(triggerCallback: boolean = false) {
    this.clearTimer();
    const currentCallback = this.toast?.onClose;
    this.toastService.hide();

    // Agar line apne aap end hui hai aur callback function set hai, toh execute karo
    if (triggerCallback && currentCallback) {
      currentCallback();
    }
  }

  clearTimer() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.clearTimer();
  }
}
