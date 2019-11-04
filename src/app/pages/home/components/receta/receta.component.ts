import { Component, OnInit, Input } from '@angular/core';
import { IReceta } from 'src/app/interfaces/usuarioReceta.interface';
import { IRespApi } from 'src/app/interfaces/resp.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss'],
})
export class RecetaComponent implements OnInit {
  @Input() receta: IReceta[] = [];
  constructor(private router: Router) {}
  irReceta(item): void {
    this.router.navigate(['/list', item.id], {queryParams: {...item, foto: item.foto}});
  }
  ngOnInit() {}

}
