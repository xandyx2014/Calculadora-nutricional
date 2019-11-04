import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private fileData: File = null;
  private previewUrl: any = null;
  private fileUploadProgress: string = null;
  private uploadedFilePath: string = null;
  constructor(private http: HttpClient,
              private notificationService: NotificationService,
              private router: Router) { }
  async fileProgress(idReceta: number, fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.onSubmit(idReceta);
    return await this.preview();
  }
  private preview() {
    // Show preview
    return new Promise( ( resolve, reject ) => {
      const mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        reject();
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      // tslint:disable-next-line: variable-name
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
        resolve (this.previewUrl);
      };
    } );
  }
  onSubmit(id: number) {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http.post(`${environment.urlHost}/upload/receta/${id}`, formData)
      .subscribe( (res: any) => {
        this.notificationService.presentAlert({
          header: 'Foto subidad',
          subHeader: `Actualizada correctamente`,
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/home']);
              }
            }
          ]
        });
      });
  }
}
