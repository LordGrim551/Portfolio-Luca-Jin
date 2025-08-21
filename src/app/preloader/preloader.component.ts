import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  progress: number = 0;
  isLoading: boolean = true;
  icons = new Array(5); // 5 iconos
  welcomeText = 'WELCOME';

  ngOnInit() {
    const interval = setInterval(() => {
      this.progress += 20; // cada paso = 20%
      if (this.progress >= 100) {
        clearInterval(interval);
        setTimeout(() => this.isLoading = false, 500);
      }
    }, 400);
  }
}
