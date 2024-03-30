import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
//directive attribut custom doit avoir le nom entre crochets
@Directive({
  selector: '[highlight]',
})
export class HightlightDirective implements AfterViewInit {
  //couleur par défaut que l'on peut changer
  @Input() color = 'yellow';

  //ElementRef pointe vers l'élément html, Renderer2 permet d'interagir avec ce dernier
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  //afterViewInit permet de s'assûrer que l'élément existe déjà, sinon undefined
  ngAfterViewInit(): void {
    this.setBackgroundColor(this.color);
  }

  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  //pour régir aux events de l'élément html:
  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor('lightgreen');
  }
  //on revient sur la color initialisée
  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor(this.color);
  }
  //si on click ça reste en vert après
  @HostListener('click') onClick() {
    this.color = 'lightgreen';
  }
}
