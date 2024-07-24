import { Component, OnInit } from '@angular/core';
import { InputChangeStyleService } from '../utils/common/input-change-style.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {

  inputFocused: boolean = false;

  constructor(private inputChangeStyleService: InputChangeStyleService) {}

  ngOnInit(): void {
    this.inputChangeStyleService.inputFocused$.subscribe(focused => {
      this.inputFocused = focused;
    });
  }
}
