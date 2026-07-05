import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsEmployeeComponent } from './comments-employee.component';

describe('CommentsEmployeeComponent', () => {
  let component: CommentsEmployeeComponent;
  let fixture: ComponentFixture<CommentsEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
