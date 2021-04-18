import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, AnimationController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('passwordIcon', { read: ElementRef }) passwordIcon: ElementRef;
  @ViewChild('emailIcon', { read: ElementRef }) emailIcon: ElementRef;


  credentials: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      remember: [false]
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      }, async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login erróneo',
          message: `${res.error.error}. Si quieres entrar en esta demo, prueba con -> Email: eve.holt@reqres.in, Contraseña: admin`,
          buttons: ['Aceptar'],
        });

        await alert.present();
      }
    );
  }

  get credentialsControl() {
    return this.credentials.controls;
  }

  rememberChangeValue() {
    this.credentials.controls.remember.setValue(!this.credentials.controls.remember.value);
  }

  startRotateAnimation() {
    const loadingAnimation = this.animationCtrl.create('rotate-animation')
      .addElement(this.passwordIcon.nativeElement)
      .addElement(this.emailIcon.nativeElement)
      .duration(1500)
      .iterations(1)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)');

    loadingAnimation.play();
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.credentials.valid) {
      console.log('Por favor, proporcione todos los valores requeridos.');
      this.startRotateAnimation();
      return false;
    } else {
      console.log(this.credentials.value);
      this.login();
    }
  }
}
