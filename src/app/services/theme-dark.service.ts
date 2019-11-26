import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeDarkService {

  constructor(
    private storage: Storage) { }
  async cambio() {
    document.body.classList.toggle('dark');
    await this.storage.set('darkTheme', {
      dark:  document.body.classList.contains('dark')
    });
  }
  isDarkTheme() {
    return this.storage.get('darkTheme');
  }
}
