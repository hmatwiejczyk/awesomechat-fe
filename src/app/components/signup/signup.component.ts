import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUserVTO } from 'src/app/models/user.models';
import * as customValidators from '../../helpers/validators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorBE: object;
  showSpinner: boolean;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [customValidators.integerValidator, Validators.required]],
      password2: ['', [customValidators.integerValidator, Validators.required]]
    });
  }

  signup() {
    this.showSpinner = true;
    const body: IUserVTO = this.signupForm.value;
    this.authService.signupUser(body).subscribe(
       data => {
        this.signupForm.reset();
        this.showSpinner = false;
       this.router.navigate(['streams']);
      },
      err => {
        this.showSpinner = false;
        this.errorBE = err.error;
      }
    );
  }

  displayError(value: string): string {
    const formControl = this.signupForm.controls[value];
    let message = '';
    if (this.errorBE) {
      Object.keys(this.errorBE).map(k => {
        if (k === value) {
          message = this.errorBE[k];
        }
      });
    }
    const errors = formControl.errors;
    if (errors) {
      this.errorBE = {};
      if (errors.required && formControl.touched) {
        message = 'This field is required';
      } else if (errors.email) {
        message = 'Use proper email format';
      } else if (errors.invalidNumber) {
        message = 'Use only numbers';
      }
    }
    return message;
  }

  submitDisabled() {
    return !this.signupForm.valid;
  }
}
