import { Injectable } from '@angular/core';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { ToastOptions, AlertOptions, ActionSheetOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastController: ToastController,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController) { }

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
  async presentActionSheet(opts: ActionSheetOptions) {
    const actionSheet = await this.actionSheetController.create(opts);
    await actionSheet.present();
  }

}
