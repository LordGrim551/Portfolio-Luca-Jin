import { Component, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypingAnimationService } from './typing-animation';
import { PreloaderComponent } from './preloader/preloader.component';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PreloaderComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  constructor(private typingAnimationService: TypingAnimationService) {}
  protected readonly title = signal('Portfolio');
  
  // Método para detectar el tamaño de la pantalla y aplicar clases específicas
  getDeviceType(): string {
    const width = window.innerWidth;
    if (width <= 640) {
      return 'mobile';
    } else if (width <= 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  ngAfterViewInit() {
    // Inicializar la animación de typing en el elemento h3
    const typingElement = document.getElementById('typing-animation');
    const typingMobile = document.getElementById('typing-animation-mobile');
    if (typingElement && typingMobile) {
      // Configurar la animación con los parámetros deseados
      this.typingAnimationService.initTypingAnimation(typingElement, {
        words: ["Web developer", "UI/UX Designer", "Software developer"],
        typingSpeed: 200,
        deletingSpeed: 200,
        pauseDuration: 3000,
        textColor: "bg-green-400",
        cursorColor: "#D2DE32"
      });
      this.typingAnimationService.initTypingAnimation(typingMobile, {
        words: ["Web developer", "UI/UX Designer", "Software developer"],
        typingSpeed: 200,
        deletingSpeed: 200,
        pauseDuration: 3000,
        textColor: "bg-green-400",
        cursorColor: "#D2DE32"
      });
    }
  }
}
