import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, share} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {

  private visible$ = new BehaviorSubject<boolean>(false);

  show() {
    this.visible$.next(true);
  }

  hide() {
    this.visible$.next(false);
  }

  isVisible(): Observable<boolean> {
    // return this.visible$.asObservable().pipe(share());
    return this.visible$.asObservable();
  }



}
