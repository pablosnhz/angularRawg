import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, exhaustMap, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Game, SearchResult } from 'src/app/core/models/game';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { searchService } from 'src/app/core/utils/common/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { GameListComponent } from '../game-list/game-list.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AbstractGamesPageParams } from 'src/app/core/models/abstract-games-page-params';

@Component({
  selector: 'app-abstract-games-page',
  templateUrl: './abstract-games-page.component.html',
  styleUrls: ['./abstract-games-page.component.scss'],
  standalone: true,
  imports: [SpinnerComponent, GameListComponent, CommonModule, RouterOutlet, ReactiveFormsModule, InfiniteScrollModule],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class AbstractGamesPageComponent implements OnInit{
  private readonly searchService: searchService = inject(searchService);
  private readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  $games = this.searchService.$games;
  $loading: Signal<boolean> = this.searchService.$loading;
  filters$: Subject<SearchFilters> = new Subject<SearchFilters>();
  scrolled$: Subject<void> = new Subject<void>();

  orderPreference: string = 'Relevance'

  searchDefaultFilters: SearchFilters = {
    search: '',
    page_size: 50,
  }

  abstractPageParams: AbstractGamesPageParams = {
    showFilters: true
  }

  form: FormGroup;

  constructor(){ }

  ngOnInit(): void {
    this.initForm();
    this.subscribeToFilterChanges();
    this.subscribeToQueryChanges();
    this.subscribeToOnScroll();
  }

  initForm(): void {
    this.form = this.fb.group({
      order: [''],
      platform: [1],
    });
    this.subscribeToFormChanges();
  }


  subscribeToQueryChanges(): void {
    this.searchService.queryString$
    .pipe(takeUntil(this.destroy$))
    .subscribe((query: string) => {
      this.filters$.next({ ...this.searchDefaultFilters, search: query });
    });
  }

  subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(()=>{
      const ordering = this.form.controls['order'].value;
      const platform = this.form.controls['platform'].value;


      this.filters$.next({ ...this.searchDefaultFilters, ordering, parent_platforms: platform });
    });
  };

  subscribeToFilterChanges(): void {
    this.filters$ = new BehaviorSubject<SearchFilters>({ ...this.searchDefaultFilters});
    this.filters$
    .pipe(
      tap(() => this.$games.set([])),
      switchMap((filters: SearchFilters) => this.searchService.searchGames(filters)),
      takeUntil(this.destroy$)
    ).subscribe((data: SearchResult) => this.$games.set(data.results));
  };

  subscribeToOnScroll(): void {
    this.scrolled$.pipe(
      exhaustMap(()=> {
        return this.searchService.nextPageScroll();
      }),
      takeUntil(this.destroy$)
    ).subscribe((data: SearchResult) => {
      this.$games.update((values: Game[]) => {
        return [...values, ...data.results]
      })
    })
  }

}
