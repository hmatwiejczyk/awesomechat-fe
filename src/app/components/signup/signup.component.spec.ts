import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{
        provide: AuthService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
