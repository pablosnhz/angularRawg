import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesGenresComponent } from './favorites-genres.component';

describe('FavoritesGenresComponent', () => {
  let component: FavoritesGenresComponent;
  let fixture: ComponentFixture<FavoritesGenresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesGenresComponent]
    });
    fixture = TestBed.createComponent(FavoritesGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
