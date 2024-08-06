import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyPagesPageComponent } from './recently-pages-page.component';

describe('RecentlyPagesPageComponent', () => {
  let component: RecentlyPagesPageComponent;
  let fixture: ComponentFixture<RecentlyPagesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentlyPagesPageComponent]
    });
    fixture = TestBed.createComponent(RecentlyPagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
