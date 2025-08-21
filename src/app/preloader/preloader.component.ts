import { Component, OnInit, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-initial-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Mejora el rendimiento
})
export class InitialLoadingScreenComponent implements OnInit {
  isLoading = true;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    // Verificar si es la primera carga de la página
    if (this.isFirstLoad()) {
      // Precarga de recursos críticos
      this.preloadCriticalAssets();
      
      // Ejecutar fuera de la zona de Angular para mejor rendimiento
      this.ngZone.runOutsideAngular(() => {
        // Esperar a que los recursos críticos se carguen
        window.addEventListener('load', () => {
          // Volver a la zona de Angular para actualizar la UI
          this.ngZone.run(() => {
            // Marcar que la página ya ha sido cargada
            this.setLoadedFlag();
            // Ocultar el preloader
            this.isLoading = false;
          });
        });
      });
    } else {
      // Si no es la primera carga, no mostrar el preloader
      this.isLoading = false;
    }
  }

  // Método para precargar recursos críticos
  private preloadCriticalAssets(): void {
    // Aquí se pueden precargar imágenes, fuentes u otros recursos críticos
    const criticalImages = [
      'assets/images/mobile/profile.jpeg',
      'assets/images/tablet/profile.jpeg',
      'assets/images/desktop/profile.jpeg'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  // Verificar si es la primera carga de la página
  private isFirstLoad(): boolean {
    return !localStorage.getItem('app_loaded');
  }
  
  // Marcar que la página ya ha sido cargada
  private setLoadedFlag(): void {
    localStorage.setItem('app_loaded', 'true');
  }
}