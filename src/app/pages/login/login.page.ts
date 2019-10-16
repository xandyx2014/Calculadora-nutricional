import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm: FormGroup;
  constructor(private  fb: FormBuilder,
              private notificationService: NotificationService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loginService.logout();
    this.crearFormulario();
  }
  crearFormulario() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    if (this.myForm.valid) {
      const { username, password } = this.myForm.value;
      this.router.navigate(['/home']);
      // this.loginService.login(username, password);
    } else {
      this.notificationService.presentToast('Falta datos por completar', 'bottom');
    }
  }

}
