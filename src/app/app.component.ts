import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {concat, fromEvent, interval, merge, Observable, of, Subscription, zip} from 'rxjs';
import {concatMap, delay, flatMap, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {fromArray} from 'rxjs/internal/observable/fromArray';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('btn1', {static: false}) btn1: ElementRef;
  @ViewChild('btn2', {static: false}) btn2: ElementRef;
  @ViewChild('btn3', {static: false}) btn3: ElementRef;

  ngOnInit(): void {

    // MAP
    // konwersja 1 do 1
    /*
    of(1, 2, 3)
      .pipe(
        map(value => value * 10)
      ).subscribe(value => console.log(value));
    */

    // HIGHER-ORDER MAPPING
    // konwerjsa 1 do Observable
    // wynik sklada sie z elementow ktore sa Observable
    // pozwala unikac zagniezdzonych wywolan subscribe


    // CONCATENATION
    // pierwszy Observable musi sie skonczyc i wtedy dopiero
    // emitowany jest kolejny Observable

    /*
    const o1$ = of(1, 2, 3);
    const o2$ = of(10, 20, 30, 40);
    const o3$ = concat(o1$, o2$);
    o3$.subscribe(data => console.log(data));
    */

    // kolejny Observable bedzie wykonywal sie dopiero po zakonczeniu poprzedniego Observable

    /*
    const o4$ = of('edward', 'ed', 'eddy');
    o4$.pipe(concatMap((value: string) =>
      zip(
        fromArray(value.split('')),
        interval(1000)).pipe(map(x => x[0]), take(value.length)))
    ).subscribe(data => console.log(`SUBSCRIBED: ${data}`));
    */

    // MERGING
    // kilka operacji rownolegle
    // przechwytywac ich wyniki zaraz w momencie wystapienia a nie w odpowiedniej kolejnosci

    /*
    const o5$ = interval(1500).pipe(take(3));
    const o6$ = interval(1000).pipe(take(5), map(value => value * 10));
    const o7$ = merge(o5$, o6$);
    o7$.subscribe(data => console.log(data));
    */

    // MERGE MAPPING

    /*
    const o8$ = of(
      {message: 'A', time: 1000},
      {message: 'F', time: 4000},
      {message: 'C', time: 2000},
      {message: 'E', time: 3000},
      {message: 'D', time: 2500},
      {message: 'B', time: 1500}
    );

    o8$
      .pipe(mergeMap(element => of(element.message).pipe(delay(element.time))))
      .subscribe(data => console.log(data));
    */


    // SWITCHING
    // kiedy kolejny Observable zaczyna emitowac dane, poprzedni Observable jest konczony
    // i zwiazane z nim zasoby sa zwalniane

    // za kazdym razem kiedy nacisniesz kolejny przycisk poprzednio emitowany Observable konczy
    // emisje danych

    fromEvent<any>(document.getElementsByTagName('button'), 'click')
      .pipe(switchMap(event => interval(1000).pipe(map(i => event.target.textContent))))
      .subscribe(data => console.log(data));

  }

}
