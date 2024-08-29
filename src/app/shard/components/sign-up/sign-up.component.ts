import { Component } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SignUpModel } from '../../../models/SignUpModel';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authSrv: AuthService,
              private router: Router){
    this.form = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      nationalId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if(this.form.valid) {
      const userForRegister: SignUpModel  = this.form.value as SignUpModel;
      this.authSrv.signUp(userForRegister).subscribe(() => {
        this.router.navigateByUrl('/admin'); // this should replaced by redirecte by role
      })
    }
  }
}
