import {Component, computed, Signal, signal} from '@angular/core';

type CounterState = { count: number }

@Component({
  selector: 'app-root',
  template: `
    <p>Counter: {{ count() }}</p>
    <p>Counter Double: {{ doubleCount() }}</p>

    <button (click)="dec()">Dec</button>
    <button (click)="inc()">Inc</button>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Selectors
  private getCountSelector = (state: Signal<CounterState>) => computed(() => state()['count']);
  private getDoubleCountSelector = (state: Signal<CounterState>) => computed(() => this.getCountSelector(state)() * 2);

  // State
  private counterState = signal({count: 1});

  // Select state with Selectors
  count = this.getCountSelector(this.counterState);
  doubleCount = this.getDoubleCountSelector(this.counterState);

  // Update State
  inc() {
    this.counterState.update(v => ({...v, count: v.count + 1}))
  }
  dec() {
    this.counterState.update(v => ({...v, count: v.count - 1}))
  }
}
