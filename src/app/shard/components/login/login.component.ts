import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoginModel } from '../../../models/LoginModel';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  redirectUrl!: string | null;
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authSrv: AuthService,
              private router: Router,
              private activateRouter: ActivatedRoute){
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.redirectUrl = this.activateRouter.snapshot.queryParamMap.get('redirectUrl');
  }
  onSubmit() {
    if(this.form.valid){
      const userForAuth: LoginModel = this.form.value as LoginModel;
      this.authSrv.login(userForAuth).subscribe(() => {
        if(!this.redirectUrl) {
          if(this.authSrv.user?.roles != undefined && this.authSrv.user?.roles.includes('admin')) {
            this.redirectUrl = '/admin';
          }else {
            this.redirectUrl = '/user';
          }
        }
        this.router.navigateByUrl(this.redirectUrl);
      });
    }
  }
}
