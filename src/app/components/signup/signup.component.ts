import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUserVTO } from 'src/app/models/user.models';

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
      password: ['', Validators.required]
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
}
