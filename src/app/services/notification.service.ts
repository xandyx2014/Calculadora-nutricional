import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public toastController: ToastController) {}

  async presentToast(message, config: ToastOptions['position']) {
    const toast = await this.toastController.create({
      message,
      position: config,
      duration: 2000
    });
    toast.present();
  }
}
