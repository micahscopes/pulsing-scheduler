# most-pulsing-scheduler

This package is a fork of @TylorS's excellent `most-virtual-scheduler`, with music and multimedia applications in mind.

This package provides [`Clock`]() and [`Timer`]() implementations that allow time to manually "pulsed" to progress through `@most/core`s `Scheduler` events dynamically and precisely.

## Install 
```sh 
# NPM
npm i --save most-pulsing-scheduler

# Yarn
yarn add most-pulsing-scheduler
```

## Usage

```js
import { createPulsingScheduler } from 'most-pulsing-scheduler'

// Construct our PulsingTimer-Scheduler pair
const [timer, scheduler] = createPulsingScheduler()

// Construct a stream
const stream = ...

// Run your stream
runEffects(stream, scheduler)

// Manually "pulse" time by 100 units // All tasks scheduled to be run between 0 and 100 will be run // in the order they were scheduled.
timer.pulse(100)
```
