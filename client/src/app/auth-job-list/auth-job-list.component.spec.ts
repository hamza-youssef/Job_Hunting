import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthJobListComponent } from './auth-job-list.component';

describe('AuthJobListComponent', () => {
  let component: AuthJobListComponent;
  let fixture: ComponentFixture<AuthJobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthJobListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
