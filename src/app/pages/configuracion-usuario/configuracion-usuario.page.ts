import { Component, OnInit } from '@angular/core';
import { ThemeDarkService } from 'src/app/services/theme-dark.service';

@Component({
  selector: 'app-configuracion-usuario',
  templateUrl: './configuracion-usuario.page.html',
  styleUrls: ['./configuracion-usuario.page.scss'],
})
export class ConfiguracionUsuarioPage implements OnInit {

  constructor(
    private themeDarkService: ThemeDarkService
  ) { }

  ngOnInit() {
  }
  cambio() {
    this.themeDarkService.cambio();
  }
}
