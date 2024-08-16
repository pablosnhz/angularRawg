import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDatesComponent } from './genre-dates.component';

describe('GenreDatesComponent', () => {
  let component: GenreDatesComponent;
  let fixture: ComponentFixture<GenreDatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenreDatesComponent]
    });
    fixture = TestBed.createComponent(GenreDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
