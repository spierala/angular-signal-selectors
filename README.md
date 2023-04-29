## Angular Signal Selector experiment

A small Angular Signal Selector experiment...

It would be cool to select Signal state with predefined selector functions.
But currently it works only partially...

Small example:
```ts
import {Component, computed, Signal, signal} from '@angular/core';

type CounterState = { count: number }

const getCount = (state: Signal<CounterState>) => computed(() => state()['count']);
const getDoubleCount = (state: Signal<CounterState>) => computed(() => getCount(state)() * 2);

@Component({
// ...
})
export class AppComponent {
  private counterState = signal({count: 1});
  count = getCount(this.counterState);
  doubleCount = getDoubleCount(this.counterState);

  inc() {
    this.counterState.update(v => ({...v, count: v.count + 1}))
  }

  dec() {
    this.counterState.update(v => ({...v, count: v.count - 1}))
  }
}
```

See the full example in the `app.component.ts`.

## Issue
At first everything seems to work fine.
But then suddenly `doubleCount` / "Counter Double" is not updated anymore.
It looks like something is garbage collected. See screen recording:

![signal-selectors-3.gif](signal-selectors-3.gif)

"Counter Double" stops working when reaching 22.
The issue occurs randomly sooner or later.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
