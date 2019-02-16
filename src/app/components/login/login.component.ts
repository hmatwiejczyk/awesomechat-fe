import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUserVTO } from 'src/app/models/user.models';
import * as customValidators from '../../helpers/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorBE: object;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [customValidators.integerValidator, Validators.required]],
    });
  }

  login() {
    const body: IUserVTO = this.loginForm.value;
    this.authService.loginUser(body).subscribe(
       data => {
        this.loginForm.reset();
       this.router.navigate(['streams']);
      },
      err => {
        this.errorBE = err.error;
      }
    );
  }

  displayError(value: string): string {
    const formControl = this.loginForm.controls[value];
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
    return !this.loginForm.valid;
  }

}
