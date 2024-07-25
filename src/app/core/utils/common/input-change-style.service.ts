import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputChangeStyleService {

  private inputFocusedSubject = new BehaviorSubject<boolean>(false);
  inputFocused$ = this.inputFocusedSubject.asObservable();

  setInputFocused(focused: boolean) {
    this.inputFocusedSubject.next(focused);
  }
}
