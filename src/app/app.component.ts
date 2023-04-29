import {Component, computed, Signal, signal} from '@angular/core';

type CounterState = { count: number }

// Selectors
const getCountSelector = (state: Signal<CounterState>) => computed(() => state()['count']);
// getDoubleCount reuses `getCountSelector`
const getDoubleCountSelector = (state: Signal<CounterState>) => computed(() => getCountSelector(state)() * 2);

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
  // State
  private counterState = signal({count: 1});

  // Select state with Selectors
  count = getCountSelector(this.counterState);
  doubleCount = getDoubleCountSelector(this.counterState);

  // Update State
  inc() {
    this.counterState.update(v => ({...v, count: v.count + 1}))
  }
  dec() {
    this.counterState.update(v => ({...v, count: v.count - 1}))
  }
}
