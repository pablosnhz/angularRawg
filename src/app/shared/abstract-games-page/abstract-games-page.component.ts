import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { debounceTime, distinctUntilChanged, merge, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Game } from 'src/app/core/models/game';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { searchService } from 'src/app/core/utils/common/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { GameListComponent } from '../game-list/game-list.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-abstract-games-page',
  templateUrl: './abstract-games-page.component.html',
  styleUrls: ['./abstract-games-page.component.scss'],
  standalone: true,
  imports: [SpinnerComponent, GameListComponent, CommonModule, RouterOutlet, ReactiveFormsModule],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class AbstractGamesPageComponent implements OnInit{
  private readonly searchService: searchService = inject(searchService);
  private readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  $games: Signal<Game[]> = this.searchService.$games;
  $loading: Signal<boolean> = this.searchService.$loading;
  onFiltersChange$: Subject<SearchFilters> = new Subject<SearchFilters>();
  filters: WritableSignal<SearchFilters> = signal({
    search: '',
    page_size: 50,
  });

  orderPreference: string = 'Relevance'

  searchFilters: SearchFilters = {
    search: '',
    page_size: 50,
  }

  form: FormGroup;

  constructor(){ }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToFilterChanges();
    this.subscribeToQueryChanges();
  }

  initForm(): void {
    this.form = this.fb.group({
      order: [''],
      platform: ['Platforms']
    });
    this.subscribeToFormChanges();
  }

  subscribeToQueryChanges(): void {
    this.searchService.queryString$
    .pipe(takeUntil(this.destroy$))
    .subscribe((query: string) => {
      this.onFiltersChange$.next({ ...this.searchFilters, search: query });
    });
  }

  subscribeToFilterChanges(): void {
    this.onFiltersChange$
    .pipe(
      switchMap((filters: SearchFilters) => this.searchService.searchGames(filters)),
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.searchService.setGames(data.results)
    });
  };

  subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(()=>{
      const ordering = this.form.controls['order'].value;
      const platform = this.form.controls['platform'].value;

      console.log(ordering, platform);

      this.onFiltersChange$.next({ ...this.searchFilters, ordering, platform });
    });
  };

}
