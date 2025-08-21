import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, SquareCode, House, Briefcase, FileArchive, GraduationCapIcon, Phone } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Mejora el rendimiento
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly SquareCode = SquareCode;
  readonly House = House;
  readonly Briefcase = Briefcase;
  readonly FileArchive = FileArchive;
  readonly GraduationCapIcon = GraduationCapIcon;
  readonly Phone = Phone;

  isMenuOpen = false;
  isScrolled = false;

  private scrollThrottleTimeout: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private currentBreakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  // Enlaces de navegación
  // nav.component.ts
navLinksDesktop = [
  { text: 'Inicio', url: '#home-desktop' },
  { text: 'Tecnologías', url: '#technologies-desktop' },
  { text: 'Experiencia', url: '#experience-desktop' },
  { text: 'Proyectos', url: '#projects-desktop' },
  { text: 'Educación', url: '#education-desktop' },
  { text: 'Contacto', url: '#contact-desktop' }
];

navLinksTablet = [
  { text: 'Inicio', url: '#home-tablet' },
  { text: 'Tecnologías', url: '#technologies-mobile-tablet' },
  { text: 'Experiencia', url: '#experience-mobile-tablet' },
  { text: 'Proyectos', url: '#projects-mobile-tablet' },
  { text: 'Educación', url: '#education-mobile-tablet' },
  { text: 'Contacto', url: '#contact-mobile-tablet' }
];

navLinksMobile = [
  { text: 'Inicio', url: '#home-mobile' },
  { text: 'Tecnologías', url: '#technologies-mobile-tablet' },
  { text: 'Experiencia', url: '#experience-mobile-tablet' },
  { text: 'Proyectos', url: '#projects-mobile-tablet' },
  { text: 'Educación', url: '#education-mobile-tablet' },
  { text: 'Contacto', url: '#contact-mobile-tablet' }
];


  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    // Inicializar el observador de tamaño para optimizar cambios de breakpoint
    this.initResizeObserver();

    // Detectar el breakpoint inicial
    this.detectBreakpoint();
  }

  ngOnDestroy(): void {
    // Limpiar recursos
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.scrollThrottleTimeout) {
      window.clearTimeout(this.scrollThrottleTimeout);
    }
  }

  // Detectar scroll para cambiar estilo del navbar con throttling para mejor rendimiento
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Evitar múltiples actualizaciones durante el scroll
    if (!this.scrollThrottleTimeout) {
      this.ngZone.runOutsideAngular(() => {
        this.scrollThrottleTimeout = window.setTimeout(() => {
          const shouldBeScrolled = window.scrollY > 50;

          if (this.isScrolled !== shouldBeScrolled) {
            this.ngZone.run(() => {
              this.isScrolled = shouldBeScrolled;
              this.cdr.markForCheck();
            });
          }

          this.scrollThrottleTimeout = null;
        }, 10); // Pequeño throttle para mejorar rendimiento
      });
    }
  }

  // Inicializar observador de cambios de tamaño
  private initResizeObserver(): void {
    this.ngZone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        this.detectBreakpoint();
      });

      this.resizeObserver.observe(document.documentElement);
    });
  }

  // Detectar breakpoint actual
  private detectBreakpoint(): void {
    const width = window.innerWidth;
    let newBreakpoint: 'mobile' | 'tablet' | 'desktop';

    if (width <= 768) {
      newBreakpoint = 'mobile';
    } else if (width <= 1024) {
      newBreakpoint = 'tablet';
    } else {
      newBreakpoint = 'desktop';
    }

    if (this.currentBreakpoint !== newBreakpoint) {
      this.ngZone.run(() => {
        this.currentBreakpoint = newBreakpoint;

        // Si cambiamos a desktop y el menú está abierto, cerrarlo
        if (newBreakpoint === 'desktop' && this.isMenuOpen) {
          this.isMenuOpen = false;
          document.body.style.overflow = '';
        }

        this.cdr.markForCheck();
      });
    }
  }

  // Alternar menú móvil
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // Prevenir scroll cuando el menú está abierto
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Forzar detección de cambios
    this.cdr.markForCheck();
  }

  // Cerrar menú al hacer clic en un enlace y realizar scroll suave
  closeMenu(event?: Event, targetId?: string) {
    if (event && targetId) {
      event.preventDefault();

      // Pequeño retraso para dispositivos móviles y tabletas
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Scroll suave hacia el elemento
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }

    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
      this.cdr.markForCheck();
    }
  }
  activeIndex = 0; // Por defecto, Home seleccionado

  // Método para cambiar el índice activo
  setActive(index: number) {
    this.activeIndex = index;
    this.cdr.markForCheck(); // Forzar actualización en OnPush
  }
 

}