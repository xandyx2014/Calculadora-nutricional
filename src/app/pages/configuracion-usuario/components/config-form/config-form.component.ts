import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';
@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss'],
})
export class ConfigFormComponent implements OnInit {
  form: FormGroup;
  ok = false;
  constructor(private fb: FormBuilder,
              private storage: Storage) { }

  ngOnInit() {
    this.crearFormulario();
  }
  crearFormulario() {
    from( this.storage.get(environment.storageKey))
    .subscribe( ( item ) => {
      this.form = this.fb.group(
        {
          username: [item.username, Validators.required],
          password: [item.password, Validators.required],
          nombre: [item.nombre, Validators.required],
          apellidos: [item.apellidos, Validators.required],
          sexo: [item.sexo, Validators.required],
        }
      );
      this.ok = true;
    });
  }
  agregarDatos() {
  }
  quitarEspacios(item) {
    this.form.patchValue({ [item.srcElement.name]: item.detail.value.trim() });
  }
  actualizarUsuario() {}
}
