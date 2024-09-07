import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListFavComponent } from './my-list-fav.component';

describe('MyListFavComponent', () => {
  let component: MyListFavComponent;
  let fixture: ComponentFixture<MyListFavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyListFavComponent]
    });
    fixture = TestBed.createComponent(MyListFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
