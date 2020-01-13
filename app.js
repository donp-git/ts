import {Observable, from, of} from 'rxjs';
import {delay, concatMap, toArray, count} from "rxjs/operators";

// const pause = time => new Promise(resolve => setTimeout(resolve, time));
//
// const machine1 = new ALEF(2, 2, 3);
// const stats = [];
//
//    //i'm confused and gave up that idea
// const machine1$ = new Observable(async subscriber => {
//     machine1.getEspresso();
//     await pause(2000);
//     stats.push(machine1);
//     subscriber.next(machine1);
//     machine1.getEspresso();
//     await pause(2000);
//     stats.push(machine1);
//     subscriber.next(stats);
//     subscriber.complete();
// },)
//     .subscribe(e => {
//         console.log(e)
//     });

/*  array subs */
const array = [100, 200, 300, 400, 500];

const arrayOp = () => {
    return concatMap(elem => of(elem).pipe(delay(500)))
};

const array$ = from(array);

const arrayDelayed$ = array$.pipe(arrayOp()
);

arrayDelayed$.subscribe((element) => {
    console.log(element)
});

arrayDelayed$.pipe(count())
    .subscribe(res => {
        console.log('Total: ' + res + ' arguments in array');
    });

/* obj subs */
const obj = {
    name: 'P',
    alive: true,
    date: 2020,
    hungry: false,
    movable: false
};

const obj$ = new Observable(subscriber => {
    for (let prop in obj) {
        if (typeof obj[prop] == "boolean") {
            subscriber.next(prop);
            subscriber.next(obj[prop]);
        }
    }
    subscriber.complete();
});

const objBoolean$ = obj$.pipe(toArray(),
    delay(3000)
);

objBoolean$.subscribe(res => console.log(res), (err) => {
    throw new Error(err)
}, () => {
    console.log('done');
});
