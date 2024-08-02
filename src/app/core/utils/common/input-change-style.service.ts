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

  private inputNoneFocusedSubject = new BehaviorSubject<boolean>(false);
  inputNoneFocused$ = this.inputNoneFocusedSubject.asObservable();

  setInputNoneFocused(focused: boolean) {
    this.inputNoneFocusedSubject.next(focused);
  }
}
