import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AutoDestroyService } from '../../utils/auto-destroy.service';
import { InputChangeStyleService } from '../../utils/common/input-change-style.service';
import { searchService } from '../../utils/common/http.service';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule, CommonModule],
})
export class TopBarComponent implements OnInit{
  query: string = '';
  queryChange$: Subject<string> = new Subject<string>();

  constructor( private gameSearchService: searchService, private destroy$: AutoDestroyService, private inputChangeStyleService: InputChangeStyleService ) { }

  ngOnInit(): void {
    this.subscribeToInputChange()
  }

  subscribeToInputChange(){
    this.queryChange$.pipe(
      debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$)
    ).subscribe((query: string) => {
      this.gameSearchService.setQueryString(query)
    })
  }




  onInputFocus() {
    this.inputChangeStyleService.setInputFocused(true);
  }

  onInputBlur() {
    this.inputChangeStyleService.setInputFocused(false);
  }
}
