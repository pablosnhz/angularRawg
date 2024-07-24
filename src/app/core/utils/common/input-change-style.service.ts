import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputChangeStyleService {

  constructor() { }

  private inputFocusedSource = new Subject<boolean>();
  inputFocused$ = this.inputFocusedSource.asObservable();

  setInputFocused(focused: boolean) {
    this.inputFocusedSource.next(focused);
  }
}
