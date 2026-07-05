import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationInComponent } from './notification-in.component';

describe('NotificationInComponent', () => {
  let component: NotificationInComponent;
  let fixture: ComponentFixture<NotificationInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
