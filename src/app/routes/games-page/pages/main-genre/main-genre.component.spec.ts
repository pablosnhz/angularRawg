import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGenreComponent } from './main-genre.component';

describe('MainGenreComponent', () => {
  let component: MainGenreComponent;
  let fixture: ComponentFixture<MainGenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainGenreComponent]
    });
    fixture = TestBed.createComponent(MainGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
