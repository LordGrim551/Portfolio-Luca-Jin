import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';  // <--- necesario para *ngIf

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [NgIf],  // <--- importa NgIf para poder usar *ngIf en el template
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  progress: number = 0;
  isLoading: boolean = true;

  ngOnInit() {
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(interval);
        setTimeout(() => this.isLoading = false, 500); // pausa para suavidad
      }
    }, 300);
  }
}
