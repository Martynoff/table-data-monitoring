import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';

export const MONITORING_START = 'MONITORING_START';
export const MONITORING_STOP = 'MONITORING_STOP';
export const MONITORING_UPDATE = 'MONITORING_UPDATE';

const TYPES = [{
  type: process.env.PUBLIC_URL + '/assets/blackjack.jpg',
  name: 'Blackjack',
  maxPlayers: 7,
}, {
  type: process.env.PUBLIC_URL + '/assets/holdem.jpg',
  name: 'Holdem',
  maxPlayers: 9,
}, {
  type: process.env.PUBLIC_URL + '/assets/roulette.jpg',
  name: 'Roulette',
  maxPlayers: 10,
}];

const LENGTH = 50000;

const items = Array(LENGTH).fill().map((item, id) => {
  const type = Math.floor(Math.random() * 3);
  return {
    id,
    ...TYPES[type],
    warning: Math.random() > 0.8,
    players: Math.floor(Math.random() * TYPES[type].maxPlayers),
  }
});

const getItems = () => items.map(item => ({
  ...item,
  warning: Math.random() > 0.8,
  players: Math.floor(Math.random() * item.maxPlayers),
}));

export const stream = (action$) =>
  action$
    .ofType(MONITORING_START)
    .switchMap(() => {
      return of({})
        .repeatWhen(o => o.concatMap(() => timer(3000, 3000)))
        .retryWhen(e => e.delay(3000))
        .map(() => {
          return { type: MONITORING_UPDATE, payload: { items: getItems() } }
        })
        .takeUntil(action$.ofType(MONITORING_STOP));
    });