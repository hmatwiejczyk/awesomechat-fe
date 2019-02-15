import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUserVTO } from 'src/app/models/user.models';
import * as customValidators from '../../helpers/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [customValidators.integerValidator, Validators.required]]
    });
  }

  signup() {
    const body: IUserVTO = this.signupForm.value;
    this.authService.signupUser(body).subscribe(
      data => {
        this.signupForm.reset();
      },
      err => console.log(err)
    );
  }

  displayError(value: string) {
    const formControl = this.signupForm.controls[value];
    const errors = formControl.errors;
    let message = '';
    if (errors) {
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
