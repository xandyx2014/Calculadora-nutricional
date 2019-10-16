import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  array = [, , , , , , , ];
  constructor(private router: Router) {}
  randomIntFromInterval(min, max) {
    /* this.cdRef.detectChanges(); */
    return `assets/img/recetas/${Math.floor(Math.random() * (max - min + 1) + min)}` + '.svg';
  }
  login() {
    this.router.navigate(['/login']);
  }
  irReceta(id: string): void {
    this.router.navigate(['/list', 1]);
  }
}
