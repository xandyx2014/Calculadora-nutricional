import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { ToastOptions, AlertOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController,
              private alertController: AlertController) {}

  async presentToast(message, config: ToastOptions['position']) {
    const toast = await this.toastController.create({
      message,
      position: config,
      duration: 2000,
      mode: 'md'
    });
    toast.present();
  }
  async presentAlert(options: AlertOptions) {
    const alert = await this.alertController.create({
      ...options
    });

    await alert.present();
  }
}
