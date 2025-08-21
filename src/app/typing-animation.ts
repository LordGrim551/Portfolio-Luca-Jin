import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypingAnimationService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Inicializa la animación de escritura en un elemento HTML
   */
  initTypingAnimation(element: HTMLElement, options: {
    words?: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    textColor?: string;
    cursorColor?: string;
  }) {
    if (!element) return;

    // Valores por defecto
    const config = {
      words: options.words || ["Frontend Developer", "UI/UX Designer", "Fullstack Developer"],
      typingSpeed: options.typingSpeed || 200,
      deletingSpeed: options.deletingSpeed || 200,
      pauseDuration: options.pauseDuration || 3000,
      textColor: options.textColor || "#D2DE32",
      cursorColor: options.cursorColor || "#D2DE32"
    };

    // Guardar el texto original del elemento
    const originalText = element.textContent || '';
    
    // Crear el contenedor para el texto animado
    const textSpan = this.renderer.createElement('span');
    this.renderer.setStyle(textSpan, 'color', config.textColor);
    
    // Crear el cursor
    const cursor = this.renderer.createElement('span');
    this.renderer.setStyle(cursor, 'display', 'inline-block');
    this.renderer.setStyle(cursor, 'width', '2px');
    this.renderer.setStyle(cursor, 'height', '1em');
    this.renderer.setStyle(cursor, 'background-color', config.cursorColor);
    this.renderer.setStyle(cursor, 'margin-left', '4px');
    this.renderer.setStyle(cursor, 'animation', 'blink 1s step-start infinite');
    
    // Añadir estilos de animación para el cursor
    const style = this.renderer.createElement('style');
    style.textContent = `
      @keyframes blink {
        50% { opacity: 0; }
      }
    `;
    this.renderer.appendChild(document.head, style);
    
    // Limpiar el elemento y añadir los nuevos elementos
    element.innerHTML = '';
    this.renderer.appendChild(element, textSpan);
    this.renderer.appendChild(element, cursor);
    
    // Variables para controlar la animación
    let currentWordIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    
    // Función para animar el texto
    const type = () => {
      const currentWord = config.words[currentWordIndex];
      
      if (isDeleting) {
        // Borrar caracteres
        charIndex--;
        textSpan.textContent = currentWord.substring(0, charIndex);
        
        if (charIndex === 0) {
          isDeleting = false;
          currentWordIndex = (currentWordIndex + 1) % config.words.length;
          setTimeout(type, config.typingSpeed);
        } else {
          setTimeout(type, config.deletingSpeed);
        }
      } else {
        // Escribir caracteres
        charIndex++;
        textSpan.textContent = currentWord.substring(0, charIndex);
        
        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(type, config.pauseDuration);
        } else {
          setTimeout(type, config.typingSpeed);
        }
      }
    };
    
    // Iniciar la animación
    setTimeout(type, 0);
  }
}